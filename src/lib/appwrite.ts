// @/src/lib/appwrite.ts
//"use server"

// Imports
import { Client, Databases, Account, ID } from "appwrite";
import { type Models } from "appwrite";
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

export async function getTasks() {
    const promise = await databases.listDocuments('67a113c40021c7fe3479', '67a113cc000fa69b928a')
    return promise.documents
}