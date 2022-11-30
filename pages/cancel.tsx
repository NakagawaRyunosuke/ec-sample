import { Card, Button, Row } from "react-bootstrap"
import Head from "next/head"

const Cancel = () => {
    return(
        <>
            <Head>
                <title>このタブは閉じてください</title>
            </Head>
            <Row style={{padding: "0 30%"}}>
                <Card>
                    <Card.Header><Card.Title>決済がキャンセルされました</Card.Title></Card.Header>
                    <Card.Body>
                        <Button style={{margin:"0 35%"}} size="lg" onClick={() => window.close()}>タブを閉じる</Button>
                    </Card.Body>
                </Card>
            </Row>
        </>

    )
}

export default Cancel