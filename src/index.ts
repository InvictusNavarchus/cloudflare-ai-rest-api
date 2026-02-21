import { Hono } from 'hono'
import { WorkersAILLMModelSchema, WorkersAILLMModel } from './types/zod-validation'
import { z } from 'zod'

/**
 * Override for the Cloudflare `Ai` runtime binding.
 * The wrangler-generated `AiModels` type is not always up-to-date with
 * models listed in the official docs, so we define our own `run` signature
 * scoped to the models Cloudflare actually support.
 */
interface CloudflareAi {
  run(model: WorkersAILLMModel, inputs: Record<string, unknown>): Promise<unknown>
}

interface Env {
  AI: CloudflareAi
}

const RequestBodySchema = z.object({
  prompt: z.string().max(1000),
  model: WorkersAILLMModelSchema
})

const app = new Hono<{ Bindings: Env }>()

app.post('/', async (c) => {
  const parsed = RequestBodySchema.safeParse(await c.req.json())

  if (!parsed.success) {
    return c.json(
      {
        error: 'Invalid request',
        issues: parsed.error.issues.map(i => ({
          field: i.path.join('.'),
          message: i.message,
        })),
      },
      400
    )
  }
  const prompt = parsed.data.prompt
  const model = parsed.data.model;
  const payload = {prompt}
  const response = await c.env.AI.run(model, payload)
  return c.json(response)
})

export default app
