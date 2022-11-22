import mongoose from "mongoose";

const GainsSchema = new mongoose.Schema({
    patisserieId: { type: mongoose.Schema.Types.ObjectId,required: true },
    userId: { type: mongoose.Schema.Types.ObjectId,required: true },
    date: { type: Date, default: Date.now }
});

const COLLECTION_NAME = "gains";
const GainsModel = mongoose.model("Gains", GainsSchema, COLLECTION_NAME);

export default GainsModel;