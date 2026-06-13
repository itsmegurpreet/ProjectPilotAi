import multer from "multer";
import path from "path";
import { env } from "@/config/env";
import { AppError } from "@/common/errors/app-error";

const uploadDir = path.resolve(process.cwd(), "uploads/documents");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext);
    const safeBase =
      base.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 48) || "document";
    cb(null, `${Date.now()}-${safeBase}${ext}`);
  },
});

const allowed = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const uploadDocument = multer({
  storage,
  limits: { fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowed.includes(file.mimetype)) {
      return cb(new AppError("Only PDF and DOCX files are allowed", 400));
    }
    return cb(null, true);
  },
});
