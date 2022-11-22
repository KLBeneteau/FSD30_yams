import express from "express";

import HomeController from "../controllers/home.js";
import AuthMiddleware from "../middleware/auth.js"

import RegisterController from "../controllers/register.js"

import LoginController from "../controllers/login.js"

import LogoutController from "../controllers/logout.js"

import JouerController from "../controllers/jouer.js"

const router = express.Router();

router.get("/login/register", RegisterController.get);
router.post("/login/register/", RegisterController.post);

router.get("/login", LoginController.get);
router.post("/login/", LoginController.post);

router.post("/logout/", LogoutController);

router.get("/", AuthMiddleware, HomeController);
router.get("/jouer", AuthMiddleware, JouerController);

export default router;
