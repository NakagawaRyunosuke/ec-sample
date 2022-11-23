import {useShoppingCart} from 'use-shopping-cart'
import { Stack, Card, ButtonGroup, Button } from "react-bootstrap"


export const CartDetail = () => {
    const { removeItem, incrementItem, decrementItem, formattedTotalPrice, clearCart, cartDetails } = useShoppingCart()
    const fetchUrl = process.env.NEXT_PUBLIC_VERSEL_URL ? `${process.env.NEXT_PUBLIC_VERSEL_URL}/api/session` : "http://localhost:3000/api/session" 

    const checkout = async () => {
        try {
            const session = await fetch(fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_VERSEL_URL}/api/*`
                },
                body: JSON.stringify({
                    items: Object.entries(cartDetails ?? {}).map(([_id, detail]) => ({
                        id: detail.id,
                        quantity: detail.quantity,
                    }))
                })
            }).then(response => response.json())
            window.open(session.url)
       } catch (e: any) {
           window.alert(e.message);
       }
    }
    return (
      <Stack gap={1}>
            {Object.entries(cartDetails ?? {}).map(([priceId, detail]) => {
                return (
                    <Card key={priceId}>
                        <Card.Body>
                            <Card.Title>{detail.name}</Card.Title>
                            <Card.Text>{detail.formattedPrice} * {detail.quantity} = {detail.formattedValue} {detail.currency}</Card.Text>
                            <ButtonGroup>
                                <Button variant="primary" onClick={() => incrementItem(priceId)}>+1</Button>
                                <Button variant="outline-secondary" onClick={() => decrementItem(priceId)}>-1</Button>
                                <Button variant="outline-danger" onClick={() => removeItem(priceId)}>削除</Button>
                            </ButtonGroup>
                        </Card.Body>
                    </Card>
                )
            })}
            <Card>
                <Card.Header>合計</Card.Header>
                <Card.Body>
                    <Card.Title>{formattedTotalPrice ? formattedTotalPrice : "￥0"}</Card.Title>
                    <ButtonGroup>
                        <Button variant='primary' onClick={checkout}>注文する</Button>
                        <Button variant="outline-danger" onClick={() => clearCart()}>カートを空にする</Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>
      </Stack>
    )
}

export default CartDetail