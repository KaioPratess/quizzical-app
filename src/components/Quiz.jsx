import { useState, useEffect, useRef} from 'react'
import {nanoid} from 'nanoid'

export default function Quiz(props) {

  const [questions, setQuestions] = useState('')
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [userAnswers, setUserAnswers] = useState({})
  const [finished, setFinished] = useState(false)
  const [render, setRender] = useState(false)
  const [hits, setHits] = useState(0)
  const questionRef = useRef()
  
  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=${5}&category=${props.inputs.category}&difficulty=${props.inputs.difficulty.toLowerCase()}&type=multiple`)
    .then(response => response.json())
    .then(data => {
      setQuestions(data.results.map((result) => {
        const options = [...result.incorrect_answers, result.correct_answer];
        const nameId = nanoid();
        options.sort();
        options.reverse();

       const opt =  options.map(opt => {
        const id = nanoid();
          return <li key={id}>
                    <input type='radio' id={id} name={nameId} data-question={data.results.indexOf(result)} onChange={handleChange}/>
                    <label htmlFor={id} className="option">{opt}</label>
                  </li>
        })
        return <div className='question' key={nanoid()} >
        <h2>{result.question}</h2>
        <ul>
          {opt}
        </ul>
        </div>
      }))

      setCorrectAnswers(data.results.map(result => {
        return result.correct_answer
      }))
    })
  }, [render])

  function handleChange(event) {
    const question = event.target.getAttribute('data-question');
    setUserAnswers(prevState => {
      return {
        ...prevState,
        [question]: event.target.nextSibling.textContent,
      }
    })
  }

  function checkAnswers() {
    setFinished(true)
    let correct = [];
    for(let i = 0; i < correctAnswers.length; i++) {
      let opts = questionRef.current.childNodes[i].childNodes[1].childNodes;
      opts.forEach(li => {
      if(correctAnswers[i] === userAnswers[i]) {
        if(correctAnswers[i] === li.childNodes[1].textContent) {
          correct.push('correct')
          setHits(correct.length)
          li.childNodes[1].style.background = '#94D7A2'
          li.childNodes[1].style.border = 'none'
        }
      } else {        
        if(correctAnswers[i] === li.childNodes[1].textContent) {
          li.childNodes[1].style.background = '#94D7A2'
          li.childNodes[1].style.border = 'none'
        }
        if(userAnswers[i] === li.childNodes[1].textContent) {
          li.childNodes[1].style.background = '#F8BCBC'
          li.childNodes[1].style.border = 'none'
        }
      }
    })
    }
  }

  function restartGame() {
    setFinished(false)
    setRender(prevState => !prevState)
  }
  
  return (
    <div className="quiz-container" >
      <div className="question" ref={questionRef}>
        {questions}
      </div>
      <div className='result-container'>
       {finished &&  <p>You scored {hits}/5 correct answers</p>}
        <button className="quiz-btn" onClick={finished ? restartGame : checkAnswers}>{!finished ? 'Check Answers' : 'Play again'}</button>
      </div>
    </div>
  )
}