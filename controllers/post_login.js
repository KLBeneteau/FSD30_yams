import UserModel from "../Models/User.js"
import CryptoJS from "crypto-js";

export default async function PostLoginController(req, res) {

    try {
        const user = await UserModel.findOne({
            email: req.body.email,
            password: CryptoJS.SHA1(req.body.password).toString()
        })
        req.session.user = {
            ...user,
            password : null
        }
        req.session.flash = null
        res.redirect("/");
    }
    catch (err) {
        req.session.flash = { type :'error', message:`Identifiants incorect`}
        res.redirect("/login");
    }
}