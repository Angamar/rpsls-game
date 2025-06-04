import { Router } from "express";
import { getChoices, getComputerChoice } from "../controllers/gameController";

const router = Router();

router.get("/choices", getChoices);
router.get("/choice", getComputerChoice);

export default router;