import mongoose from "mongoose"
const LoanRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  tokenNumber: { type: String },
  appointmentDate: { type: Date },
});

module.exports = mongoose.model("LoanRequest", LoanRequestSchema);
