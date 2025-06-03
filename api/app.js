const express = require('express');
const app = express();
const port = 3000;

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});