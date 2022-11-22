import { NextApiRequest, NextApiResponse } from "next";
import {Stripe} from "stripe"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method?.toLocaleLowerCase() !== "get"){
        return res.status(405).end()
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
        apiVersion: "2022-11-15"
    })

    const products = await stripe.products.list()
    if(!products || products.data.length < 1){
        return res.status(200).json([])
    }

    const response = await Promise.all(products.data.map(async (resProduct: Stripe.Product) => {
        const prices = await stripe.prices.list({
            product: resProduct.id
        })
        return {
            id: resProduct.id,
            description: resProduct.description,
            name: resProduct.name,
            images: resProduct.images,
            unit_label: resProduct.unit_label,
            prices: prices.data.map(price => {
                return {
                    id: price.id,
                    currency: price.currency,
                    transform_quantity: price.transform_quantity,
                    unit_amount: price.unit_amount,
                }
            })
        }
    }))

    res.status(200).json(response)
}

export default handler


