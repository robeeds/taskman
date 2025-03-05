// @/src/lib/appwrite.ts

// Imports
import { Client, Databases, Account, ID, Models, AppwriteException } from "appwrite";
import { redirect } from "next/navigation";
import { RegisterFormSchema, LoginFormSchema, AuthFormState } from "./definitions";

export const client: Client = new Client();
client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("6753d8760022acf2006b")

export const account: Account = new Account(client);
export const databases: Databases = new Databases(client);

export { ID } from "appwrite"
export { type Models } from "appwrite"

// Register the user
export async function register(state: AuthFormState, formData: FormData) {

    // Validate form fields
    const validatedFields = RegisterFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Set the email, password, and name
    const { email, password, name } = validatedFields.data

    try {
        await account.create(ID.unique(), email, password, name);
        await account.createEmailPasswordSession(email, password);
    } catch (error) {
        if (error instanceof AppwriteException) {
            if (error.code == 409) {
                return {
                    message: 'An account already exists for this email'
                }
            } else {
                return {
                    message: error.message
                }
            }
        }
    }
    redirect('/dashboard');
}

// Login the user
export async function login(state: AuthFormState, formData: FormData) {

    // Validate form fields
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Set email, password, and name
    const { email, password } = validatedFields.data;

    try {
        await account.createEmailPasswordSession(email, password);
    } catch (error) {
        // If there was an error, return early
        if (error instanceof AppwriteException) {
            return {
                message: error.message
            }
        } else {
            return {
                message: 'Something went wrong'
            }
        }
    }
    redirect("/dashboard")
}

// Logout the user
export async function logout() {
    await account.deleteSession("current");
    redirect("/")
}

// Get the currently logged in user
export async function getLoggedInUser() {
    const user = account.get()
    return user;
}

// Specifies attributes of Task Object
export interface Task extends Models.Document {
    title: string;
    description: string;
    dueDate: Date;
    isImportant: boolean;
    isCompleted: boolean;
}