import {useState, useEffect} from 'react'
import info from '../info'

export default function InitialPage(props) {
  const categories = info.trivia_categories.map((category, i) => {
    return <option value={category.name} key={i}>{category.name}</option>
  });

  const difficulties = info.difficulties.map((difficulty, i) => {
    return <option value={difficulty} key={i}>{difficulty}</option>
  } );

  return (
    <div className="initial-page">
      <h1>Quizzical</h1>
      <div className="inputs">
        <div>
        <label htmlFor="category">Select Category:</label>
          <select id="category" onChange={(e) => props.handleChange(e, 'category')}>
            {categories}
          </select>
        </div>
        <div>
          <label htmlFor="difficulty">Select Difficulty:</label>
          <select id="difficulty" onChange={(e) => props.handleChange(e, 'difficulty')}>
            {difficulties}
          </select>
        </div>
      </div>
      <button className="start-btn" onClick={props.handleClick}>Start Quiz</button>
    </div>
  )
}