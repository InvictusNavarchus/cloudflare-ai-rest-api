import { Hono } from 'hono'
import { WorkersAILLMModelSchema } from './types/zod-validation'
import { z } from 'zod'

interface Env {
  AI: Ai
}

const RequestBodySchema = z.object({
  prompt: z.string().max(1000),
  model: WorkersAILLMModelSchema
})

interface Ai {
  run(model: string, payload: Record<string, string>): Promise<any>
}

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
