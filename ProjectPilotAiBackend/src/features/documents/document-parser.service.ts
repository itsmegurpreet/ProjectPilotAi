import fs from "fs/promises";
import mammoth from "mammoth";
import pdfParse from "pdf-parse";
import { AppError } from "@/common/errors/app-error";

type PdfParseFn = (buffer: Buffer) => Promise<{ text?: string }>;

const parsePdf = ((pdfParse as unknown as { default?: PdfParseFn }).default ||
  (pdfParse as unknown as PdfParseFn)) as PdfParseFn;

export const documentParserService = {
  async extractText(filePath: string, mimetype: string) {
    if (mimetype === "application/pdf") {
      const buffer = await fs.readFile(filePath);
      const parsed = await parsePdf(buffer);
      return parsed.text?.trim() || "";
    }

    if (
      mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const parsed = await mammoth.extractRawText({ path: filePath });
      return parsed.value?.trim() || "";
    }

    throw new AppError("Unsupported document type", 400);
  },
};
