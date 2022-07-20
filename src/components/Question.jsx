import {useState, useEffect} from 'react'
import {nanoid} from "nanoid"

export default function Question() {

  const [questions, setQuestions] = useState('')
  
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
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
                    <input type='radio' id={id} name={nameId}/>
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
    })
  }, [])

  return (
    <div className="question">
      {questions}
    </div>
  )
}