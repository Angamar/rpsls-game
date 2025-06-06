import { useState } from "react";
import axios from "axios";

import "./App.css";
import type { Choice, ChoiceList } from "../types/generated";
import ChoiceButton from "./components/ChoiceButton";
import { Typography } from "@mui/material";

function App() {
  const [choices, setChoices] = useState<ChoiceList>([]);
  const [results, setResults] = useState([]);

  const handleChoiceClick = async (choiceId: number) => {
    const response = await axios.post("api/play", { player: choiceId });
    console.log("Response from play endpoint:", response.data);
    setResults(response.data.results);
  }

  const handleClick = async () => {
    try {
      const response = await axios.get("api/choices");
      console.log("Response:", response);
      console.log("Response data:", response.data);
      setChoices(response.data ?? []);
    } catch (error) {
      console.error("Error fetching choices:", error);
    }
  };

  return (
    <p className="read-the-docs">
      <Typography variant="h1" component="div" gutterBottom>
        Welcome to the Game!
      </Typography>

      <Typography variant="h4" gutterBottom>
        Last 10 results:
      </Typography>



      <button onClick={handleClick} className="button">
        Click me to fetch choices
      </button>
      {choices.length > 0 && (
        choices.map((choice: Choice) => <ChoiceButton key={choice.id} label={choice.name} onClick={() => handleChoiceClick(choice.id)} />)
      )}
    </p>
  );
}

export default App;
