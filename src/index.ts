import { Hono } from 'hono'

interface Env {
  AI: Ai
}

interface requestBody {
  prompt: string,
  model: string
}

interface Ai {
  run(model: string, payload: Record<string, string>): Promise<any>
}

const app = new Hono<{ Bindings: Env }>()

app.post('/', async (c) => {
  const requestBody = await c.req.json() as requestBody
  const prompt = requestBody.prompt;
  const model = requestBody.model;
  const payload = {prompt}
  const response = await c.env.AI.run(model, payload)
  return c.json(response)
})

export default app
