import PattiseriesModel from "../Models/Pattiseries.js";

export async function nbrPattiserie(){
    let pattiseries = await PattiseriesModel.find({})
    return pattiseries.reduce(
      (n, pattiserie) => n + pattiserie.number, 0
    )
}