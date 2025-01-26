import sendResponse from "../helpers/sendResponse.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/User.js";

export async function authenticateUser(req, res, next) {
  try {
    const bearerToken = req?.headers?.authorization;
    const token = bearerToken?.split(" ")[1];
    if (!token) return sendResponse(res, 403, null, true, "Token not provided");
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);

    console.log("decoded=>", decoded)

    if (decoded) {
      const user = await User.findById(decoded._id).lean();
      if (!user) return sendResponse(res, 403, null, true, "User not found");
      req.user = user;
      next();
    } else {
      sendResponse(res, 500, null, true, "Something went wrong");
    }
  } catch (err) {
    sendResponse(res, 500, null, true, "Something went wrong");
  }
}
