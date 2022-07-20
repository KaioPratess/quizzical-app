import { useState, useEffect } from 'react'
import './App.css'
import InitialPage from './components/InitialPage'
import Quiz from './components/Quiz'

function App() {
  const [inputs, setInputs] = useState({})

  return (
    <div className='main-container'>
      <InitialPage />
    </div>
  )
}

export default App
