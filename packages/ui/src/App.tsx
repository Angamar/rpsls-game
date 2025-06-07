import { useState } from "react";
import axios from "axios";

import "./App.css";
import { type ChoiceItem, type Result, type RoundOutcome } from "../../shared/src/types";
import ChoiceButton from "./components/ChoiceButton";

function App() {
  const [choices, setChoices] = useState<ChoiceItem[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [roundOutcome, setRoundOutcome] = useState<RoundOutcome>();

  const handleChoiceClick = async (choiceId: number) => {
    const response = await axios.post("api/play", { player: choiceId });
    setResults((prevResults) => [...prevResults, response.data.result]);
    setRoundOutcome(response.data)
  }

  const handleClick = async () => {
    try {
      const response = await axios.get("api/choices");
      setChoices(response.data ?? []);
    } catch (error) {
    }
  };

  return (
    <>
      <h1>
        Welcome to the Game!
      </h1>
      <p className="read-the-docs">
        {roundOutcome && (
          <div className="roundOutcome">
            <h3>Round Outcome</h3>

            <h2>{roundOutcome.result === 'win' ? 'You win!' : roundOutcome.result === 'lose' ? 'You lose!' : 'It\'s a tie!'}</h2>
            {roundOutcome &&
              <span className="win">{`${roundOutcome.winnerChoice} ${roundOutcome.verb ?? "&"} ${roundOutcome.loserChoice}!`}</span>
            }
          </div>
        )}


        {!choices.length && <button onClick={handleClick} >Play</button>}
        <div className="cardsContainer">
          {choices.length > 0 && (
            choices.map((choice: ChoiceItem) => <ChoiceButton key={choice.id} label={choice.name} suit={choice.icon} onClick={() => handleChoiceClick(choice.id)} />)
          )}
        </div>

        <p>
          Last 10 results:
        </p>
        {
          results.length > 0 && (
            <div className="resultsContainer" >
              {results.slice(-10).map((result, index) => (
                <div key={index} className={"resultItem"} style={{ background: result === 'win' ? 'green' : result === 'lose' ? 'red' : 'black' }}>
                  {result}
                </div>
              ))}
            </div>
          )
        }
      </p>
    </>
  );
}

export default App;
