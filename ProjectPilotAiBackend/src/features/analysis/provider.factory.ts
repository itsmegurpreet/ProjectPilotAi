import { AppError } from "@/common/errors/app-error";
import { env } from "@/config/env";
import { AIProvider } from "@/features/analysis/ai-provider.interface";
import { MockProvider } from "@/features/analysis/providers/mock.provider";
import {
  getDefaultBaseUrl,
  OpenAICompatibleProvider,
} from "@/features/analysis/providers/openai-compatible.provider";

export function createAIProvider(): AIProvider {
  if (env.AI_PROVIDER === "mock") {
    return new MockProvider();
  }

  if (!env.AI_API_KEY) {
    throw new AppError("AI_API_KEY is required for non-mock providers", 500);
  }

  if (
    env.AI_PROVIDER === "qwen" ||
    env.AI_PROVIDER === "deepseek" ||
    env.AI_PROVIDER === "openai"
  ) {
    const baseUrl = env.AI_BASE_URL || getDefaultBaseUrl(env.AI_PROVIDER);
    return new OpenAICompatibleProvider(baseUrl, env.AI_API_KEY, env.AI_MODEL);
  }

  return new MockProvider();
}
