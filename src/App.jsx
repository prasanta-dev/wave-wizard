import React from 'react'
import Home from './pages/Home'
import ControlPage from './pages/ControlPage'
import { Route, Routes } from 'react-router-dom'

function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/controlPage' element={<ControlPage />} />
      </Routes>
    </div>
  )
}

export default App