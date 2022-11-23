import { nbrPattiserie } from "../utils/utils.js";
import GainsModel from "../Models/Gain.js";
import PattiseriesModel from "../Models/Pattiseries.js";

export default async function home(req, res) {

  //RESET 
  //await UserModel.updateMany({aJouer : false});
  //req.session.user.aJouer = false ;
  //await GainsModel.remove({});await PattiseriesModel.updateMany({},{number:10})

  let gains = await GainsModel.aggregate([
    { $lookup : {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'user'
    } },
    { $lookup : {
      from: 'pattiseries',
      localField: 'patisserieId',
      foreignField: '_id',
      as: 'pattiserie'
    } }
  ])

  res.render("home", {
    nbrRestant : await nbrPattiserie(),
    gains:gains
  });
}
