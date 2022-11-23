import GainsModel from "../Models/Gain.js";
import PattiseriesModel from "../Models/Pattiseries.js";
import UserModel from "../Models/User.js"

export default async function home(req, res) {

    //fait les jet
    let result = jet()
    let count = [0,0,0,0,0,0]

    //formate les données
    for(let jet of result)
        count[jet]++

    //console.log(result,count)

    let double = 0
    let totalGain = 0
    for(let c of count){
        if(c == 4){
            req.session.flash = { type :'success', message:`Bravo vous avez gagnez 2 pattiserie !`, vue : false }
            totalGain += 2
        }
        if(c == 5){
            req.session.flash = { type :'success', message:`JACKPOT vous avez gagnez 3 pattiserie !`, vue : false}
            totalGain += 3
        }
        if(c == 2) double++
    }
    if(double == 2){
        req.session.flash = { type :'success', message:`Géniale vous avez gagnez une pattiserie !`, vue : false}
        totalGain++
    }

    if( totalGain == 0)  req.session.flash = { type :'error', message:`Perdu :( `, vue : false}

    //let USER_ID = mongoose.Types.ObjectId(req.session.user._id)
    let USER_ID = req.session.user._id
    for(let i=0; i<totalGain; i++)
        await newGain(USER_ID)

    await UserModel.findOneAndUpdate({_id:req.session.user._id},{aJouer:true})
    req.session.user.aJouer = true;
    req.session.user.tirage = result

    res.redirect("/");
}

function jet(){
    let result = []
    for(let i=0; i<5; i++)
        result.push( Math.floor(Math.random() * 6))
    return result 
}

async function newGain(userId){
    let patisserie = await getRandomPatisserie()
    
    await GainsModel.create({
        patisserieId: patisserie._id,
        userId: userId
    })

    await PattiseriesModel.findOneAndUpdate({_id:patisserie._id},{number: patisserie.number-1})
}

async function getRandomPatisserie(){

    let patisseries = await PattiseriesModel.find({number : { $gt : 0}})
    let nbrPatisserie = patisseries.length

    return patisseries[Math.floor(Math.random() * nbrPatisserie)]
}