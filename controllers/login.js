import UserModel from "../Models/User.js"
import bcrypt from "bcrypt"

async function post(req, res) {

    try {
        const user = await UserModel.findOne({
            email: req.body.email
        }).lean() //https://mongoosejs.com/docs/api/query.html#query_Query-lean
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

function get(req, res) {
    res.render("login");
}

export default {
    post : post ,
    get : get 
}