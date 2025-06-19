import {z} from 'zod'

export const agentSessionSchema = z.object({
  session_id: z.string(),
})

export type AgentSession = z.infer<typeof agentSessionSchema>

export const agentTalkResponseSchema = z.object({
  response: z.string(),
  generated_sql: z.string(),
  config_json: z.object({
    generate_visualization: z.boolean(),
    config: z.object({
      visualization_type: z.string(),
      y: z.array(z.union([z.number(), z.string()])),
      x: z.array(z.union([z.number(), z.string()])),
      title: z.string(),
      y_label: z.array(z.string()),
      x_label: z.string(),
    }),
  }),
})

export type AgentTalkResponse = z.infer<typeof agentTalkResponseSchema>
