import { Router } from "express";
import {
  getChoices,
  getComputerChoice,
  playRound,
} from "../controllers/gameController.js";

const router = Router();

router.get("/choices", getChoices);
router.get("/choice", getComputerChoice);
router.post("/play", playRound);

export default router;
