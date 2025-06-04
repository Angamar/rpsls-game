import { Router } from "express";
import { getChoices, getRandomChoice } from "../controllers/gameController";

console.log(typeof getChoices);

const router = Router();

router.get("/choices", getChoices);
router.get("/choice", getRandomChoice);

export default router;