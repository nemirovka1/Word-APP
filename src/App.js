import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";
import { Link } from "react-router-dom";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [help , setHelp] = useState(false)
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const helpersWords = ['Verso','Video','Vigor' , 'Weary', 'Wedge', 'Weigh' , 'Whiff' , 'Zonal' ,'Angle', 'Crash' , 'Minus' , 'Lucky',
  'Music', 'Movie', 'Round' , 'Sugar' , 'Sweet' , 'Twice' , 'React']

  const numberWords  = Math.floor(Math.random()*(helpersWords.length -1)-1 + 1)

  const renderHelper = () => {
    setHelp(true)
    const timeout = setTimeout(()=> {
      setHelp(false)
    },2000)
  }

  const onEnter = () => {

    if (currAttempt.letter !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    } else {
      alert("Word not found");
    }

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };
  
  // const removeIncorrectWords = () => {
  //   const newBoard = [...board];
  //   newBoard[currAttempt.attempt][currAttempt.letter] = "";
  //   setBoard(newBoard);
  //   setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1});
  // }

  const onSelectLetter = (key) => {
    if (currAttempt.letter > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <Link to="/">
        <div className = "linkBox">
        <svg class="svg-icon" viewBox="0 0 20 20">
              <path fill="black" d="M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0
              L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109
              c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483
              c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788
              S18.707,9.212,18.271,9.212z"></path>
            </svg>
          <h2 className="linkPath">Return to start</h2>
        </div>
      </Link>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          setDisabledLetters,
          disabledLetters,
          gameOver,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
     <div className="helperBox">
     <button onClick={()=> renderHelper()} className="helperBtn">Help</button>
      {
        help ? (
            <h1 style={{textAlign: 'center' , color: 'black'}}>{helpersWords[numberWords]}</h1>
        )
        : null
      }
     </div>
    </div>
  );
}

export default App;
