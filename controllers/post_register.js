import UserModel from "../Models/User.js"
import CryptoJS from "crypto-js";

export default async function PostRegisterController(req, res) {

    if(req.body.password != req.body.confirm_password){
        req.session.flash = { type :'error', message:`mot de passe et confirmation non identique`}
        console.log('erreur mdp')
        res.redirect("/login/register");
    }
        
    try {
        const user = await UserModel.findOne({email:req.body.email})
        console.log('user',user)
        if(user) {
            req.session.flash = { type :'error', message:`email déja utilisé !`}
            console.log('erreur compte existant')
            res.redirect("/login/register");
        } else {

            try {
                await UserModel.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: CryptoJS.SHA1(req.body.password).toString()
                })
                req.session.flash = { type :'success', message:`Compte créer avec succès !`}
                console.log('compte créer !')
                res.redirect("/login");
            }
            catch (err) {
                res.status(500).send(`Erreur interne : ${err.message}`);
            }

        }
    } catch (err) {}

}