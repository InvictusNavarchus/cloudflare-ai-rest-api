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

type RequestBody = z.infer<typeof RequestBodySchema>

interface Ai {
  run(model: string, payload: Record<string, string>): Promise<any>
}

const app = new Hono<{ Bindings: Env }>()

app.post('/', async (c) => {
  const requestBody: RequestBody = RequestBodySchema.parse(await c.req.json())
  const prompt = requestBody.prompt;
  const model = requestBody.model;
  const payload = {prompt}
  const response = await c.env.AI.run(model, payload)
  return c.json(response)
})

export default app
