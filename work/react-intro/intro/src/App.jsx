import { useState } from 'react';
import ResultInfo from './ResultInfo';
import './app.css';

function App() {
  const [inputWord, setInputWord] = useState('');
  const [submitWord, setSubmitWord] = useState('');

  return (
    <div className="app">
      <form>
        <label>
          <span>Word you guess:</span>
        </label>
        <input value={inputWord} onInput={ (e) => setInputWord(e.target.value)}/>
        <button type="button" onClick={ () => {setSubmitWord(inputWord); setInputWord('')}}>Submit</button>
      </form>
      <ResultInfo word = {submitWord}/>
    </div>
  );
}

export default App;