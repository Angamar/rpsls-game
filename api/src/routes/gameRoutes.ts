import { Router } from "express";
import { getChoices } from "../controllers/gameController";

console.log(typeof getChoices);

const router = Router();

router.get("/choices", getChoices);


export default router;