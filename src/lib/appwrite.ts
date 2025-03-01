// @/src/lib/appwrite.ts

// Imports
import { Client, Databases, Account, ID, Models } from "appwrite";
import { redirect } from "next/navigation";

export const client: Client = new Client();
client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("6753d8760022acf2006b")

export const account: Account = new Account(client);
export const databases: Databases = new Databases(client);

export { ID } from "appwrite"
export { type Models } from "appwrite"

// Register the user
export async function register(email: string, password: string, name: string) {
    await account.create(ID.unique(), email, password, name);
    login(email, password);
}

// Login the user
export async function login(email: string, password: string) {
    await account.createEmailPasswordSession(email, password);
    return getLoggedInUser
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