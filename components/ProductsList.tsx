import { NextPage } from "next";
import { Container, Row , Col, Image, Stack, Button } from "react-bootstrap"
import type {Props} from "../pages/index"
import {useShoppingCart} from "use-shopping-cart"
import CartDetail from "./CartDetail"
import { useState } from "react";

const ProductsList: NextPage<Props> = ({products}) => {
    const {addItem} = useShoppingCart()
    const [addFlag, setAddFlag] = useState(false)

    const add = (id: string, name: string, unit_amount: number | null, currency: string, image: string) => {
        addItem({
            id: id,
            name: name,
            price: unit_amount!,
            currency: currency,
            image: image
        })
        setAddFlag(true)
    }

    return(
        <Container className="mb-3">
            <Row>
                <Col>
                    <Stack gap={3}>
                    {products.map(product => {
                        return (
                        <Row key={product.id}>
                            <Col xs={4}>
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                style={{maxWidth: '100%'}}
                            />
                            </Col>
                            <Col>
                            <Stack gap={3}>
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                            </Stack>
                            <Stack direction="horizontal">
                                {product.prices.map(price => {
                                return (
                                    <dl key={price.id}>
                                    <dt>価格</dt>
                                    <dd>
                                        <span>{price.unit_amount ? (`${price.unit_amount.toLocaleString()}${price.currency.toLocaleUpperCase()}`) : null}</span>
                                        {price.transform_quantity ? <small>({price.transform_quantity.divide_by}アイテム毎)</small> : null}
                                    </dd>
                                    <dd>
                                        <form action="/api/session" method="POST">
                                            <input type='hidden' name='price' value={price.id}/>
                                            <input type='hidden' name='quantity' value={1}/>
                                            <Button type='submit'>いますぐ注文する</Button>
                                        </form>
                                    </dd>
                                    <dd>
                                        <Button onClick={() => add(
                                            price.id,
                                            product.name,
                                            price.unit_amount!,
                                            price.currency,
                                            product.images[0],
                                        )}>カートに追加する</Button>
                                    </dd>
                                    </dl>
                                )
                                })}
                            </Stack>
                            </Col>
                        </Row>
                        )
                    })}
                    </Stack>
                </Col>
                <Col md={4}>
                    <CartDetail />
                </Col>
            </Row>
            
        </Container>
    )
}

export default ProductsList