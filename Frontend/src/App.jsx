import React from 'react'
import NavBar from './Components/NavBar'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import Cart from './Pages/Cart'
import ProductDetails from './Pages/ProductDetails'
import ProceedToPay from './Pages/ProceedToPay'
import Orders from './Pages/Orders'

function App() {
  return (
    <div>
      <section>
        <NavBar />
      </section>
      <section>
        <Orders/>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  )
}

export default App
