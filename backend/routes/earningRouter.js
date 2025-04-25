import express from "express";
import mongoose from "mongoose";
import Earnings from "../models/earningsSchema.js";

const router = express.Router();

router.get("/earnings/:interviewerId", async (req, res) => {
  try {
    const { interviewerId } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(interviewerId)) {
      return res.status(400).json({ message: "Invalid interviewer ID format" });
    }

    // Convert interviewerId to ObjectId
    const earnings = await Earnings.findOne({ interviewerId: new mongoose.Types.ObjectId(interviewerId) });

    if (!earnings) {
      return res.status(404).json({ message: "Earnings not found for this interviewer" });
    }

    res.status(200).json({ totalEarnings: earnings.amount });
  } catch (error) {
    console.error("Error fetching earnings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




export default router;
