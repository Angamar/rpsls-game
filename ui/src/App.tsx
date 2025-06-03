import { useState } from "react";

import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    try {
      const response = await fetch("/api/message");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error fetching message:", error);
      setMessage("Failed to fetch message");
    }
  };

  return (
    <p className="read-the-docs">
      {message}
      <button onClick={handleClick} className="button">
        Click me to fetch message
      </button>
    </p>
  );
}

export default App;
