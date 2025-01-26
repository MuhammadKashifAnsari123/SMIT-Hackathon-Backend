import mongoose from "mongoose"
const UserSchema = new mongoose.Schema({
  cnic: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
