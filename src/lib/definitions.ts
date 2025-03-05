// @/src/app/lib/definitions.ts

// Imports
import { z } from "zod"

// Schema for Registration Form
export const RegisterFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
})

// Schema for Login Form
export const LoginFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
})

// Schema for Task Creation Form
export const CreateTaskSchema = z.object({
    title: z
        .string()
        .min(1, { message: 'Please enter a task title' })
        .trim(),
    description: z
        .string()
        .trim()
        .optional(),
    dueDate: z
        .string()
        .trim()
        .date()
        .optional()
        .or(z.literal('')),
    isImportant: z
        .coerce.boolean(),
    isComplete: z
        .boolean(),
})

// Register and Login Form States, returns errors from zod
export type AuthFormState =
    | {
        errors?: {
            name?: string[]
            email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined