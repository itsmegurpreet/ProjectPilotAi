import fs from "fs/promises";
import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";
import { AppError } from "@/common/errors/app-error";

export const documentParserService = {
  async extractText(filePath: string, mimetype: string) {
    if (mimetype === "application/pdf") {
      const buffer = await fs.readFile(filePath);
      const parser = new PDFParse({ data: buffer });

      try {
        const parsed = await parser.getText();
        return parsed.text?.trim() || "";
      } finally {
        await parser.destroy();
      }
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
