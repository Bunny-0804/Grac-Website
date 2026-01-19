import { useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import StudentHome from './pages/StudentHomePage.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='Website'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/StudentHome' element={<StudentHome/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
