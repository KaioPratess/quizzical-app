import info from '../info'

export default function InitialPage() {
  const categories = info.categories.map((category, i) => {
    return <option value={category} key={i}>{capitalize(category)}</option>
  });

  function capitalize(phrase) {
    const array = phrase.split(' ');
    const newWord = array.map(word => {
      const firsLetter = word.split('')[0].toUpperCase();
      return `${firsLetter}${word.slice(1)}`;
    })

    return newWord.join(' ')
  }
  
  const difficulties = info.difficulties.map((difficulty, i) => {
    return <option value={difficulty} key={i}>{capitalize(difficulty)}</option>
  } );

  return (
    <div className="initial-page">
      <h1>Quizzical</h1>
      <div className="inputs">
        <div>
        <label htmlFor="category">Select Category:</label>
          <select id="category">
            {categories}
          </select>
        </div>
        <div>
          <label htmlFor="difficulty">Select Difficulty:</label>
          <select id="difficulty">
            {difficulties}
          </select>
        </div>
      </div>
      <button className="start-btn">Start Quiz</button>
    </div>
  )
}