import React from 'react'
import NavBar from './Components/NavBar'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import Cart from './Pages/Cart'

function App() {
  return (
    <div>
      <section>
        <NavBar />
      </section>
      <section>
        <Home/>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  )
}

export default App
