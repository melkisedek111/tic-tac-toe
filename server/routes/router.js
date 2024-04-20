import express from "express";
import homeController from "../controllers/home.controller.js";
import gameController from "../controllers/game.controller.js";
const router = express.Router();

router.get('/api/home', homeController.home);
router.post('/api/saveGameData', gameController.saveGameData);

export default router;