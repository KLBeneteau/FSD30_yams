import UserModel from "../Models/User.js"
import bcrypt from "bcrypt"

async function post(req, res) {

    if(req.body.password != req.body.confirm_password){
        req.session.flash = { type :'error', message:`mot de passe et confirmation non identique`, vue : false}
        res.redirect("/login/register");
    }
        
    try {
        const user = await UserModel.findOne({email:req.body.email})

        if(user) {
            req.session.flash = { type :'error', message:`email déja utilisé !`, vue : false}
            res.redirect("/login/register");
        } else {

            try {
                await UserModel.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
                })
                req.session.flash = { type :'success', message:`Compte créer avec succès !`, vue : false}
                res.redirect("/login");
            }
            catch (err) {
                res.status(500).send(`Erreur interne : ${err.message}`);
            }

        }
    } catch (err) {}

}

function get(req, res) {
    res.render("register");
}
  
export default {
    post : post ,
    get : get 
}