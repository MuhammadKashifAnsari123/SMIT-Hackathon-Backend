
// // User Routes (userRoutes.js)
// import express from "express";
// const { User, LoanRequest, Guarantor } = require("./models");
// const QRCode = require("qrcode");
// const router = express.Router();

// // Register user
// router.post("/register", async (req, res) => {
//   const { cnic, email, name } = req.body;
//   try {
//     const user = new User({ cnic, email, name });
//     await user.save();
//     res.status(201).json({ message: "User registered successfully", user });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Submit loan request
// router.post("/loans", async (req, res) => {
//   const { userId, amount } = req.body;
//   try {
//     const loanRequest = new LoanRequest({ userId, amount });
//     await loanRequest.save();
//     res.status(201).json({ message: "Loan request submitted", loanRequest });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Add guarantor information
// router.post("/guarantors", async (req, res) => {
//   const { loanRequestId, name, cnic, phone } = req.body;
//   try {
//     const guarantor = new Guarantor({ loanRequestId, name, cnic, phone });
//     await guarantor.save();
//     res.status(201).json({ message: "Guarantor added", guarantor });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Fetch loan details
// router.get("/loans/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const loanDetails = await LoanRequest.findById(id).populate("userId");
//     if (!loanDetails) return res.status(404).json({ message: "Loan not found" });
//     res.json(loanDetails);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Generate slip with QR code and appointment details
// router.get("/loans/:id/slip", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const loan = await LoanRequest.findById(id).populate("userId");
//     if (!loan) return res.status(404).json({ message: "Loan not found" });

//     const qrData = {
//       user: loan.userId.name,
//       amount: loan.amount,
//       appointmentDate: loan.appointmentDate,
//     };

//     const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

//     res.json({
//       slip: {
//         loanDetails: loan,
//         qrCode,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// module.exports = router;

// // Admin Routes (adminRoutes.js)
// const express = require("express");
// const { LoanRequest } = require("./models");
// const router = express.Router();

// // View all applications
// router.get("/applications", async (req, res) => {
//   try {
//     const applications = await LoanRequest.find().populate("userId");
//     res.json(applications);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Update application status
// router.put("/applications/:id/status", async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   try {
//     const loan = await LoanRequest.findByIdAndUpdate(id, { status }, { new: true });
//     if (!loan) return res.status(404).json({ message: "Loan not found" });
//     res.json({ message: "Status updated", loan });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Add token numbers to applications
// router.post("/applications/:id/token", async (req, res) => {
//   const { id } = req.params;
//   const { tokenNumber } = req.body;
//   try {
//     const loan = await LoanRequest.findByIdAndUpdate(
//       id,
//       { tokenNumber },
//       { new: true }
//     );
//     if (!loan) return res.status(404).json({ message: "Loan not found" });
//     res.json({ message: "Token number added", loan });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Filter applications by city/country
// router.get("/applications/filter", async (req, res) => {
//   const { city, country } = req.query;
//   try {
//     const filters = {};
//     if (city) filters["userId.city"] = city;
//     if (country) filters["userId.country"] = country;

//     const applications = await LoanRequest.find(filters).populate("userId");
//     res.json(applications);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// module.exports = router;

// // Main Server (server.js)
// const express = require("express");
// const bodyParser = require("body-parser");
// const userRoutes = require("./userRoutes");
// const adminRoutes = require("./adminRoutes");
// require("./db");

// const app = express();
// app.use(bodyParser.json());
// app.use("/api/users", userRoutes);
// app.use("/api/admin", adminRoutes);

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
