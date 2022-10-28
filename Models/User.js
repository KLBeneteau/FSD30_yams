import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String,required: true },
  lastName: { type: String,required: true },
  email: { type: String,required: true },
  password: { type: String,required: true }
});

const COLLECTION_NAME = "users";
const UserModel = mongoose.model("Users", UserSchema, COLLECTION_NAME);

export default UserModel;