import React from 'react'
import NavBar from './Components/NavBar'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import Cart from './Pages/Cart'
import ProductDetails from './Pages/ProductDetails'
import ProceedToPay from './Pages/ProceedToPay'
import Orders from './Pages/Orders'
import Account from './Pages/Account'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <section className='fixed top-0 left-0 right-0 z-50'>
          <NavBar />
        </section>
        <section className='mt-20'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
        </Routes>
        </section>
        <section>
          <Footer />
        </section>
      </div>
    </Router>
  )
}

export default App
