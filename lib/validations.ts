import z from 'zod';

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is Required' })
    .max(255, { message: 'Title cannot exceed 255 characters' }),

  description: z
    .string()
    .min(1, 'Description is Required')
    .max(5000, { message: 'Description cannot exceed 500 characters' }),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is Required' })
    .max(255, { message: 'Title cannot exceed 255 characters' })
    .optional(),

  description: z
    .string()
    .min(1, 'Description is Required')
    .max(5000, { message: 'Description cannot exceed 500 characters' })
    .optional(),

  assignedToUserId: z
    .string()
    .min(1, 'Assigned User is Required')
    .max(255)
    .optional()
    .nullable(),
});
