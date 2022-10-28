import UserModel from "../Models/User.js"
import bcrypt from "bcrypt"

export default async function PostRegisterController(req, res) {

    if(req.body.password != req.body.confirm_password){
        req.session.flash = { type :'error', message:`mot de passe et confirmation non identique`}
        res.redirect("/login/register");
    }
        
    try {
        const user = await UserModel.findOne({email:req.body.email})
        if(user) {
            req.session.flash = { type :'error', message:`email déja utilisé !`}
            res.redirect("/login/register");
        } else {

            try {
                await UserModel.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
                })
                req.session.flash = { type :'success', message:`Compte créer avec succès !`}
                res.redirect("/login");
            }
            catch (err) {
                res.status(500).send(`Erreur interne : ${err.message}`);
            }

        }
    } catch (err) {}

}