import {z} from 'zod'
import {messageGrpahSchema} from './message'

export const agentSessionSchema = z.object({
  session_id: z.string(),
})

export type AgentSession = z.infer<typeof agentSessionSchema>

export const agentTalkResponseSchema = z.object({
  response: z.string(),
  generated_sql: z.string(),
  config_json: z.object({
    generate_visualization: z.boolean(),
    config: messageGrpahSchema.optional(),
  }),
})

export type AgentTalkResponse = z.infer<typeof agentTalkResponseSchema>
