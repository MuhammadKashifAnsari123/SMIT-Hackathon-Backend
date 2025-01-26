// import express from "express";
// import morgan from "morgan";
// import "dotenv/config";
// import mongoose from "mongoose";
// import cors from "cors";
// import taskRoutes from "./routers/tasks.js";
// import authRoutes from "./routers/auth.js";
// import userRoutes from "./routers/users.js";
// import donorRoutes from "./routers/blooddonors.js";
// import todoRoutes from "./routers/todos.js";
// import courseRoutes from "./routers/course.js";
// import orderRoutes from "./routers/orders.js";
// import postRoutes from "./routers/post.js";
// import studentRoutes from "./routers/students.js";

// import { authenticateUser } from "./middleware/authentication.js";
// import { Resend } from "resend";
// import nodemailer from "nodemailer";
// import multer from "multer";
// const upload = multer({ dest: "uploads/" });

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_EMAIL,
//     pass: process.env.GMAIL_PASSWORD,
//   },
// });

// const app = express();
// const PORT = 4000;

// app.use(cors());
// app.use(morgan("tiny"));
// app.use(express.json());
// app.use(cors("*"));

// mongoose
//   .connect(process.env.MONGODBURI)
//   .then(() => console.log("mongodb connected"))
//   .catch((err) => console.log("err=>", err));

// app.get("/", (req, res) => res.send("Server is running"));

// app.use("/task", authenticateUser, taskRoutes);
// app.use("/auth", authRoutes);
// app.use("/user", userRoutes);
// app.use("/blooddonors", authenticateUser, donorRoutes);
// app.use("/todos", todoRoutes);
// app.use("/course", courseRoutes);
// app.use("/orders", orderRoutes);
// app.use("/post", postRoutes);
// app.use("/students", studentRoutes);

// app.get("/sendEmail", async (req, res) => {
//   const info = await transporter.sendMail({
//     from: '"Bilal Aur Code 👻" <bilalaurcode@gmail.com', // sender address
//     to: "attari1235@gmail.com, bilalteaching@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   res.send("Message sent: %s" + info.messageId);
// });

// app.listen(PORT, () => console.log("Server is running on PORT " + PORT));

import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import "dotenv/config";
import Users from "./models/Users.js";
import authRoutes  from "./routers/auths.js";
import User from "./models/User.js";
import LoanRequest from "./models/loanRequest.js";
import Guarantor from "./models/guarantor.js";

// import authenticateToken from "./middleware/authenticateToken.js"
const app = express();
// const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
// MongoDB Connection
// const mongoose = require("mongoose");

// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));
 
  mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("err=>", err));

// Routes

// app.get('/api/protected-route', authenticateToken, (req, res) => {
//   // Only accessible if token is valid
//   res.json({ message: "Welcome to the protected route!", user: req.user });
// });



app.use('/api', authRoutes);

app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new Users({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the user exists
//     const user = await Users.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Generate a token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//     console.log(token);
    
//     res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });

// Start the server


  
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Generated Token:", token); // Debugging purpose
    console.log("User logged in:", user.email);

    // Send response with token
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});





const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
