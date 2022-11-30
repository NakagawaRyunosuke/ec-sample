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
        const {price, quantity, items} = req.body
        const lineItems = items
        ? items.map((item: any) => ({
            price: item.id,
            quantity: item.quantity,
            adjustable_quantity: {
                enabled: true,
            }
        }))
        :[{
            price,
            quantity,
            adjustable_quantity: {
                enabled: true,
                minimum: 1,
                maximum: 10,
            }
        }]
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/cancel`,
        })
        if(items){
            res.status(200).json({
                url: session.url
            })
        }else{
            res.redirect(301, session.url ?? "")
        }
        
    }catch (e: any) {
       console.log(e)
       res.status(e.statusCode || 500).json({
           message: e.message
       })
    }
    
}

export default handler