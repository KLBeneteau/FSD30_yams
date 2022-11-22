import mongoose from "mongoose";

const PattiseriesSchema = new mongoose.Schema({
    name: { type: String,required: true },
    number: { type: Number,required: true },
    order: { type: String,required: true },
});

const COLLECTION_NAME = "pattiseries";
const PattiseriesModel = mongoose.model("Pattiseries", PattiseriesSchema, COLLECTION_NAME);

export default PattiseriesModel;