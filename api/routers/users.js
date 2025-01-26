import express from "express";
import sendResponse from "../helpers/sendResponse.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { authenticateUser } from "../middleware/authentication.js";
import User from "../models/User.js";

const router = express.Router();

router.get('/userInfo', authenticateUser, async (req, res) => {
  try {
    sendResponse(res, 200, req.user, false, "User Fetched Successfully");
  }
  catch (err) {
    sendResponse(res, 500, null, true, "Something went wrong");
  }
}
)


router.put("/", authenticateUser, async (req, res) => {
  try {
    const { city, country } = req.body;
    const user = await User.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      {
        city,
        country,
      },
      { new: true }
    ).exec(true);
    sendResponse(res, 200, user, false, "User Updated Successfully");
  } catch (err) {
    sendResponse(res, 500, null, true, "Something went wrong");
  }
});

router.get("/myInfo", authenticateUser, async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.user._id,
    });
    sendResponse(res, 200, user, false, "User Updated Successfully");
  } catch (err) {
    sendResponse(res, 500, null, true, "Something went wrong");
  }
});

export default router;
