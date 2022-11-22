import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container } from 'react-bootstrap'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar bg="dark" variant="dark"  className="mb-3">
        <Container>
          <Navbar.Brand href="#home">
            EC SAMPLE
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp