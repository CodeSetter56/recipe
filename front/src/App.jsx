import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Create from './pages/Create'
import Saved from './pages/Saved'
import Auth from './pages/Auth'
import Edit from './pages/Edit'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/edit/:id' element={<Edit />}/>
          <Route path='/saved' element={<Saved/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App