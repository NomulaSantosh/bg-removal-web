// API Controller function to manage clerk user with database
// http://localhost:4000/api/user/webhooks

import {Webhook} from 'svix'
import userModel from '../models/userModel.js'

const clerkWebhooks = async (req, res) => {
    
    try {
        
        // create a svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
        })

        const [data, type] = req.body

        switch (type) { 
            case "user.created":{

                // if we get any user get created
                const userData = {
                    clerkId: data.id, //here id i took from webhooks is https://dashboard.clerk.com/apps/app_2yVK7EjBcZFF7XmdmX4h4TtXro7/instances/ins_2yVK7Cdnl0kBMFCc3u2sqpUnkcB/webhooks
                    email: data.email_addresses[0].email_address, // i got the email_addresses from same link and it will be same for below
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                }

                await userModel.create(userData)
                res.json({})

                break;
            }

            case "user.updated":{

                const userData = {
                    //clerkId: data.id,// we don't need clek id for already created user data. //here id i took from webhooks is https://dashboard.clerk.com/apps/app_2yVK7EjBcZFF7XmdmX4h4TtXro7/instances/ins_2yVK7Cdnl0kBMFCc3u2sqpUnkcB/webhooks
                    email: data.email_addresses[0].email_address, // i got the email_addresses from same link and it will be same for below
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                }

                await userModel.findOneAndUpdate({clerkId:data.id}, userData)
                res.json({})
                break;
            }

            case "user.deleted":{

                await userModel.findOneAndDelete({clerkId:data.id})
                res.json({})

                break;
            }
        
            default:
                break;
        }

    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.messsage})
    }

}

export {clerkWebhooks}