import { nbrPattiserie } from "../utils/utils.js";
import GainsModel from "../Models/Gain.js";
import PattiseriesModel from "../Models/Pattiseries.js";
import UserModel from "../Models/User.js";

export default async function home(req, res) {

  //RESET 
  //await UserModel.updateMany({aJouer : false});
  //req.session.user.aJouer = false ;
  //await GainsModel.remove({});await PattiseriesModel.updateMany({},{number:10})

  let users = await UserModel.find({})
  let gains = await GainsModel.find({})
  let patisseries = await PattiseriesModel.find({})

  //console.log(req.session.user)

  res.render("home", {
    nbrRestant : await nbrPattiserie(),
    gains:gains,
    patisseries:patisseries,
    users : users
  });
}
