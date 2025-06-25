import {z} from 'zod'
import {messageGrpahSchema, messageSchema} from './message'
import {agentTalkResponseSchema} from './agent'

export const chatSchema = z.object({
  chat_id: z.string(),
  chat_title: z.string(),
  created_at: z.union([z.date(), z.string()]),
  updated_at: z.union([z.date(), z.string()]),
})

export type Chat = z.infer<typeof chatSchema>

export const createChatRequestSchema = z.object({
  chat_title: z.string().min(1, 'Chat title is required'),
})

export type CreateChatRequest = z.infer<typeof createChatRequestSchema>

export const createChatResponseSchema = chatSchema

export type CreateChatResponse = z.infer<typeof createChatResponseSchema>

export const getChatsResponseSchema = z.array(chatSchema)

export type GetChatsResponse = z.infer<typeof getChatsResponseSchema>

export const chatThreadSchema = z.object({
  chat_thread_question: z.object({
    message: z.string(),
  }),
  chat_thread_response: agentTalkResponseSchema,
  user_id: z.number(),
  chat_id: z.string(),
  session_id: z.string(),
  chat_thread_id: z.number(),
  created_at: z.union([z.date(), z.string()]),
  updated_at: z.union([z.date(), z.string()]),
})

export type ChatThread = z.infer<typeof chatThreadSchema>

export const getChatThreadsResponseSchema = z.array(chatThreadSchema)

export type GetChatThreadsResponse = z.infer<typeof getChatThreadsResponseSchema>
