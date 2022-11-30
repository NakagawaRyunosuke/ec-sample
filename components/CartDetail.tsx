import {useShoppingCart} from 'use-shopping-cart'
import { Stack, Card, ButtonGroup, Button } from "react-bootstrap"
import { useRouter } from 'next/router'

export const CartDetail = () => {
    const { removeItem, incrementItem, decrementItem, formattedTotalPrice, clearCart, cartDetails } = useShoppingCart()
    const fetchUrl = "api/session"
    const router = useRouter()

    const increment = (priceId: string) => {
        incrementItem(priceId)
    }

    const decrement = (priceId: string) => {
        decrementItem(priceId)
       
       
    }

    const remove = (priceId: string) => {
        removeItem(priceId)
       
       
    }

    const clearAll = () => {
        clearCart()
       
       
    }

    const checkout = async () => {
        const items = Object.entries(cartDetails ?? {}).map(([_id, detail]) => ({
            id: detail.id,
            quantity: detail.quantity,
        }))
        if(items.length < 1){
            alert("Cart is empty.")
            return
        }
        try {
            const session = await fetch(fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: items
                }),
            }).then(response => response.json())
            // router.push(session.url)
            window.open(session.url)
       } catch (e: any) {
           window.alert(e.message);
       }
    }

    return (
      <Stack gap={1}>
            {Object.entries(cartDetails ?? {}).map(([_priceId, _detail]) => {
                    return (
                        <Card key={_priceId}>
                            <Card.Body>
                                <Card.Title>{_detail.name}</Card.Title>
                                <Card.Text>{_detail.formattedPrice} * {_detail.quantity} = {_detail.formattedValue} {_detail.currency}</Card.Text>
                                <ButtonGroup>
                                    <Button variant="primary" onClick={() => increment(_priceId)}>+1</Button>
                                    <Button variant="outline-secondary" onClick={() => decrement(_priceId)}>-1</Button>
                                    <Button variant="outline-danger" onClick={() => remove(_priceId)}>削除</Button>
                                </ButtonGroup>
                            </Card.Body>
                        </Card>
                    ) 
                }
            )}
            <Card>
                <Card.Header>合計</Card.Header>
                <Card.Body>
                    <Card.Title>{formattedTotalPrice ? formattedTotalPrice : "￥0"}</Card.Title>
                    <ButtonGroup>
                        <Button variant='primary' onClick={checkout}>注文する</Button>
                        <Button variant="outline-danger" onClick={() => clearAll()}>カートを空にする</Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>
      </Stack>
    )
}

export default CartDetail