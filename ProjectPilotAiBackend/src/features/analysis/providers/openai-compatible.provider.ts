import { AppError } from "@/common/errors/app-error";
import { ProjectAnalysisJson } from "@/common/utils/analysis-template";
import { env } from "@/config/env";
import { AIProvider } from "@/features/analysis/ai-provider.interface";

interface OpenAICompatibleResponse {
  choices: Array<{ message: { content: string } }>;
}

export class OpenAICompatibleProvider implements AIProvider {
  constructor(
    private readonly baseUrl: string,
    private readonly apiKey: string,
    private readonly model: string,
  ) {}

  private async callJSON(prompt: string): Promise<unknown> {
    const response = await fetch(
      `${this.baseUrl.replace(/\/$/, "")}/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          temperature: 0.2,
          messages: [
            {
              role: "system",
              content: "Return strictly valid JSON only. No markdown.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      throw new AppError(
        `AI provider failed with status ${response.status}`,
        502,
      );
    }

    const data = (await response.json()) as OpenAICompatibleResponse;
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new AppError("Empty AI response", 502);
    }

    try {
      return JSON.parse(content);
    } catch {
      throw new AppError("AI did not return valid JSON", 502);
    }
  }

  async analyzeRequirements(input: string): Promise<ProjectAnalysisJson> {
    const prompt = `Analyze the following requirements and return JSON with keys summary, goals, modules, assumptions, dependencies, risks, milestones, wbs, sprints, timeline. Requirements: ${input}`;
    return (await this.callJSON(prompt)) as ProjectAnalysisJson;
  }

  async generateWBS(input: string): Promise<string[]> {
    const prompt = `Generate work breakdown structure as JSON array of strings. Requirements: ${input}`;
    return (await this.callJSON(prompt)) as string[];
  }

  async generateSprintPlan(input: string): Promise<string[]> {
    const prompt = `Generate sprint plan as JSON array of strings. Requirements: ${input}`;
    return (await this.callJSON(prompt)) as string[];
  }

  async generateTimeline(input: string): Promise<string[]> {
    const prompt = `Generate timeline estimate as JSON array of strings. Requirements: ${input}`;
    return (await this.callJSON(prompt)) as string[];
  }
}

export function getDefaultBaseUrl(provider: "qwen" | "deepseek" | "openai") {
  if (provider === "qwen")
    return "https://dashscope-intl.aliyuncs.com/compatible-mode/v1";
  if (provider === "deepseek") return "https://api.deepseek.com/v1";
  return env.AI_BASE_URL || "https://api.openai.com/v1";
}
