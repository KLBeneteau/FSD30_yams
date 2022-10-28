import express from "express";

import HomeController from "../controllers/home.js";
import AuthMiddleware from "../middleware/auth.js"

import RegisterController from "../controllers/register.js"
import PostRegisterController from "../controllers/post_register.js"

import LoginController from "../controllers/login.js"
import PostLoginController from "../controllers/post_login.js"

import LogoutController from "../controllers/logout.js"
import PostLogoutController from "../controllers/post_logout.js"

const router = express.Router();

router.get("/login/register", RegisterController);
router.post("/login/register/", PostRegisterController);

router.get("/login", LoginController);
router.post("/login/", PostLoginController);

router.get("/logout", LogoutController);
router.post("/logout/", PostLogoutController);

router.get("/", AuthMiddleware, HomeController);

export default router;
