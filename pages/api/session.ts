import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2022-11-15"
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method!.toLocaleLowerCase() !== 'post') {
        return res.status(405).end()
    }
    try{
        const {price, quantity} = req.body
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [{
                price,
                quantity,
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1,
                    maximum: 10,
                }
            }],
            mode: "payment",
            success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}`,
        })
        
        res.redirect(301, session.url ?? "http://localhost:3000")
    }catch (e: any) {
       console.log(e)
       res.status(e.statusCode || 500).json({
           message: e.message
       })
   }
    
}

export default handler