const router = require("express").Router();
const gameController = require("../controller/gameController");

router.get("/choices", gameController.getChoices);

module.exports = router;