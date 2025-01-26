import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";
const router = express.Router();
import "dotenv/config";







// Signup Endpoint
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await Users.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
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
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }


// JWT_SECRET_KEY ko environment se access karen
const secretKey = process.env.JWT_SECRET_KEY;

const payload = {
    userId: 123,
    username: 'userName'
};

// Token sign karte waqt secretKey use karen
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

console.log('Token:', token);  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
 export default router;
  