import UserModel from "../Models/User.js"
import bcrypt from "bcrypt"

export default async function PostLoginController(req, res) {

    try {
        const user = await UserModel.findOne({
            email: req.body.email
        })
        if(!bcrypt.compareSync(req.body.password, user.password)){
            req.session.flash = { type :'error', message:`Mot de passe inccorect`}
            res.redirect("/login");
        } else {
            req.session.user = {
                ...user,
                password : null
            }
            req.session.flash = null
            res.redirect("/");
        }
    }
    catch (err) {
        req.session.flash = { type :'error', message:`Identifiants incorect`}
        res.redirect("/login");
    }
}