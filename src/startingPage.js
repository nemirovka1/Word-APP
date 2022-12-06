import { Link } from "react-router-dom"
import "./App.css";

export const StartPage = () => {
    return (
        <div className="bgcColor">
            <h1>Welcome</h1>
            <Link to='/game'>
            <button className="beginBtn">Start play</button>
            </Link>
            <div className="ruleBox">
            <h1 className="titleRule">Rules of the game</h1>
            <h2 className="textRule">You need to come up with words that consist of 5 letters, do not repeat letters in words. 
                While typing, you will see green letters, from which you will need to collect a word. 
                If the word is assembled correctly, you win. If not, try again</h2>
            </div>
        </div>
    )
}