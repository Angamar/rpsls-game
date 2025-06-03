import { useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [choices, setChoices] = useState([]);

  const handleClick = async () => {
    try {
      const response = await axios.get("api/choices");
      console.log("Response data:", response.data);
      setChoices(response.data ?? []);
    } catch (error) {
      console.error("Error fetching choices:", error);
    }
  };

  return (
    <p className="read-the-docs">
      <button onClick={handleClick} className="button">
        Click me to fetch choices
      </button>
      {choices.length > 0 && (
        <ul>
          {choices.map((choice, index) => (
            <li key={index} style={{ color: 'white' }}>{choice?.name}</li>
          ))}
        </ul>
      )}
    </p>
  );
}

export default App;
