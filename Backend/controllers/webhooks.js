import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
    try {

        console.log("========== WEBHOOK START ==========")
        console.log("BODY:", req.body)
        console.log("TYPE:", req.body?.type)

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        console.log("VERIFYING WEBHOOK...")

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        console.log("WEBHOOK VERIFIED SUCCESSFULLY")

        const { data, type } = req.body

        console.log("EVENT TYPE:", type)
        console.log("CLERK USER ID:", data?.id)

        switch (type) {

            case 'user.created': {

                console.log("USER CREATED EVENT")

                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                }

                console.log("CREATING USER:", userData)

                await User.create(userData)

                console.log("USER SUCCESSFULLY ADDED TO MONGODB")

                return res.json({ success: true })
            }

            case 'user.updated': {

                console.log("USER UPDATED EVENT")

                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }

                await User.findByIdAndUpdate(data.id, userData)

                console.log("USER SUCCESSFULLY UPDATED")

                return res.json({ success: true })
            }

            case 'user.deleted': {

                console.log("USER DELETED EVENT")

                await User.findByIdAndDelete(data.id)

                console.log("USER SUCCESSFULLY DELETED")

                return res.json({ success: true })
            }

            default:
                console.log("UNKNOWN EVENT:", type)
                return res.sendStatus(200)
        }

    } catch (error) {

        console.error("========== WEBHOOK ERROR ==========")
        console.error(error)

        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
