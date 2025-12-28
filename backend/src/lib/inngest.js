import { Inngest } from "inngest";
import ENV from './env.config.js'
import User from '../models/User.js'
import { connectDB } from './db.js'

if (!ENV.INNGEST_CLIENT_ID) {
    throw new Error("INNGEST_CLIENT_ID missing in the environment variables")
}
export const inngest = new Inngest({ id: ENV.INNGEST_CLIENT_ID }); // inngest client

const syncUser = inngest.createFunction(
    { id: "sync-user" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        await connectDB();

        const { id, email_addresses, first_name, last_name, image_url } = event.data;
        const newUser = {
            clerkId: id,
            email: email_addresses[0].email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            profilePicture: image_url
        }
        await User.create(newUser)
    }
)

const deleteUserFromDatabase = inngest.createFunction(
    { id: "delete-user-from-database" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        await connectDB();

        const { id } = event.data;
        await User.deleteOne({ clerkId: id })
    }
)

export const functions = [syncUser, deleteUserFromDatabase]