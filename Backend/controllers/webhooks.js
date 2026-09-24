import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req, res) => {

    console.log("🔥 WEBHOOK RECEIVED")

    try {

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        console.log("✅ WEBHOOK VERIFIED")

        const { data, type } = req.body

        console.log("EVENT TYPE:", type)

        switch (type) {

            case 'user.created': {

                console.log("👤 USER CREATED EVENT")

                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                }

                console.log("USER DATA:", userData)

                await User.create(userData)

                console.log("✅ USER SAVED TO MONGODB")

                res.json({})
                break
            }

            case 'user.updated': {

                console.log("✏️ USER UPDATED EVENT")

                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }

                await User.findByIdAndUpdate(data.id, userData)

                res.json({})
                break
            }

            case 'user.deleted': {

                console.log("🗑️ USER DELETED EVENT")

                await User.findByIdAndDelete(data.id)

                res.json({})
                break
            }

            default:

                console.log("⚠️ UNKNOWN EVENT:", type)

                return res.sendStatus(200)
        }

    } catch (error) {

        console.error("❌ CLERK WEBHOOK FAILED:", error)

        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}