import { useState, useEffect } from 'react'
import info from './info'
import './App.css'
import InitialPage from './components/InitialPage'
import Quiz from './components/Quiz'

function App() {
  const [inputs, setInputs] = useState({category: null, difficulty: null})

  const [startGame, setStartGame] = useState(false)

  function handleChange(event, type) {
    setInputs(prevState => {
      let categoryId;
      for(let category of info.trivia_categories) {
        if(event.target.value === category.name) {
          categoryId = category.id
        }
      }
      return {
        category: type === 'category' ? categoryId : prevState.category,
        difficulty: type === 'difficulty' ? event.target.value : prevState.difficulty,
      }
    })
  }

  function start() {
    if(inputs.category === null || inputs.difficulty === null) {
      alert('Select the options!')
    } else {
      setStartGame(true)
    }
  }

  function returnHome() {
    setStartGame(false)
  }

  const style = {
    height: !startGame ? '100vh' : '900px'
  }

  return (
    <div className='main-container' style={style}>
      {!startGame && <InitialPage handleChange={handleChange} handleClick={start}/>}
      {startGame && <header className='header' onClick={returnHome}>Quizzical</header>}
      {startGame && <Quiz inputs={inputs}/>}
    </div>
  )
}

export default App
