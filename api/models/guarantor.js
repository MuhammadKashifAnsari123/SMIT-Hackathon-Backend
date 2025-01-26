import mongoose from "mongoose";

const GuarantorSchema = new mongoose.Schema({
  loanRequestId: { type: mongoose.Schema.Types.ObjectId, ref: "LoanRequest", required: true },
  name: { type: String, required: true },
  cnic: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model("Guarantor", GuarantorSchema);
