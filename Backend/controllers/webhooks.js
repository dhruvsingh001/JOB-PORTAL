import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req, res) => {

    try {

         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(req.body, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })


        const { data, type } = JSON.parse(req.body.toString('utf8'))


        switch (type) {

            case 'user.created': {

                console.log("👤 USER CREATED EVENT")

                const userData = {
                    _id: data.id,
                    email: data.email_addresses?.[0]?.email_address || '',
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                }

                await User.create(userData)

                res.json({})
                break
            }

            case 'user.updated': {

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

                await User.findByIdAndDelete(data.id)

                res.json({})
                break
            }

            default:

                return res.sendStatus(200)
        }

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
