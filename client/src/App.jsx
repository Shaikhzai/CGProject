import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Canvas from './canvas'
import Coustomizer from './pages/Coustomizer'
import Home from './pages/Home'
import Order from './pages/Order'

const App = () => {
  return (
    <main className="app transition-all">
      <Home></Home>
      <Canvas />
      <Coustomizer />
      <Canvas />
    {/*   <Order/> */}
    </main>
  )
}

export default App
