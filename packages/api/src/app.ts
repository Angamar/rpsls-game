import express from "express";
import gameRoutes from "./routes/gameRoutes";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api", gameRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
