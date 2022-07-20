import { useState, useEffect } from 'react'
import Question from './Question'

export default function Quiz() {

  return (
    <div className="quiz-container">
      <Question />
      <button className="quiz-btn">Check Answers</button>
    </div>
  )
}