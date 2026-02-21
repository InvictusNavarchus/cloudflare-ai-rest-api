import { z } from "zod";

export const WorkersAILLMModelSchema = z.enum([
  "@cf/meta/llama-3.2-1b-instruct",
  "@cf/meta/llama-3.2-3b-instruct",
  "@cf/meta/llama-3.1-8b-instruct-fp8-fast",
  "@cf/meta/llama-3.2-11b-vision-instruct",
  "@cf/meta/llama-3.1-70b-instruct-fp8-fast",
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
  "@cf/mistral/mistral-7b-instruct-v0.1",
  "@cf/mistralai/mistral-small-3.1-24b-instruct",
  "@cf/meta/llama-3.1-8b-instruct",
  "@cf/meta/llama-3.1-8b-instruct-fp8",
  "@cf/meta/llama-3.1-8b-instruct-awq",
  "@cf/meta/llama-3-8b-instruct",
  "@cf/meta/llama-3-8b-instruct-awq",
  "@cf/meta/llama-2-7b-chat-fp16",
  "@cf/meta/llama-guard-3-8b",
  "@cf/meta/llama-4-scout-17b-16e-instruct",
  "@cf/google/gemma-3-12b-it",
  "@cf/qwen/qwq-32b",
  "@cf/qwen/qwen2.5-coder-32b-instruct",
  "@cf/qwen/qwen3-30b-a3b-fp8",
  "@cf/openai/gpt-oss-120b",
  "@cf/openai/gpt-oss-20b",
  "@cf/aisingapore/gemma-sea-lion-v4-27b-it",
  "@cf/ibm-granite/granite-4.0-h-micro",
  "@cf/zai-org/glm-4.7-flash",
]);

export type WorkersAILLMModel = z.infer<typeof WorkersAILLMModelSchema>;