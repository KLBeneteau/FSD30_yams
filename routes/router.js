import express from "express";

import HomeController from "../controllers/home.js";

const router = express.Router();

router.get("/", AuthMiddleware, HomeController);

export default router;
