const express = require('express');
const app = express();
const port = 3000;
const gameRoutes = require("./routes/gameRoutes");


app.use(express.json({ extended: true }));
app.use("/api", gameRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});