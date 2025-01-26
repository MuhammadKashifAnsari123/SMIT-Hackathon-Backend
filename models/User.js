import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullname: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    city: { type: String },
    country: { type: String },
    dob: { type: String },
    isProfileCompleted: { type: Boolean },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

export default User;
