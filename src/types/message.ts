import {z} from 'zod'

export const messageGrpahSchema = z.object({
  visualization_type: z.string(),
  y: z.array(z.union([z.number(), z.string()])),
  x: z.array(z.union([z.number(), z.string()])),
  title: z.string(),
  y_label: z.array(z.string()),
  x_label: z.string(),
})

export type MessageGrpah = z.infer<typeof messageGrpahSchema>

export const messageReportSchema = z.object({
  content: z.string(),
})

export type MessageReport = z.infer<typeof messageReportSchema>

export const messageSchema = z.object({
  id: z.string(),
  type: z.enum(['user', 'agent']),
  text: z.string(),
  timestamp: z.date(),
  graph: messageGrpahSchema.optional(),
  report: messageReportSchema.optional(),
})

export type Message = z.infer<typeof messageSchema>
