import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container } from 'react-bootstrap'
import { AppProps } from 'next/app'
import {CartProvider} from "use-shopping-cart"


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      currency="JPY"
      shouldPersist={false}
      loading={<p aria-live="polite">Loading redux-persist...</p>}
    >
      <Navbar bg="dark" variant="dark"  className="mb-3">
        <Container>
          <Navbar.Brand href="#home">
            EC SAMPLE
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp