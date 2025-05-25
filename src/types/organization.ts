import {z} from 'zod'

export const organizationSchema = z.object({
  organization_id: z.number(),
  organization_name: z.string(),
  organization_description: z.string(),
  organization_logo_url: z.string(),
})

export type Organization = z.infer<typeof organizationSchema>

export const organizationsSchema = z.array(organizationSchema)
export type Organizations = z.infer<typeof organizationsSchema>
