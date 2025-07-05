import express from "express";
import gameRoutes from "./routes/gameRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", gameRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
