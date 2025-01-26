// import jwt from "jsonwebtoken"
// // Middleware to check authentication
// const authenticateToken = (req, res, next) => {
//   // Get token from Authorization header
//   const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

//   if (!token) {
//     return res.status(403).json({ message: "No token provided" });
//   }

//   // Verify token
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid token" });
//     }
//     req.user = user; // Attach user data to request object
//     next(); // Proceed to next middleware or route handler
//   });
// };  



// export default authenticateToken

import jwt from "jsonwebtoken";
import "dotenv/config";

export async function authenticateUser(req, res, next) {
  try {
    const bearerToken = req.headers.authorization; // Token headers se le rahe hain
    const token = bearerToken?.split(" ")[1]; // Bearer token ka second part (actual token)

    if (!token) {
      return res.status(403).json({ success: false, message: "Token not provided!" });
    }

    const decoded = jwt.verify(token, process.env.AUTH_SECRET); // Token verify
    req.user = decoded; // Decoded user data req.user mein save
    next(); // Next middleware ya controller
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid or expired token!" });
  }
}
