import mongoose from "mongoose";

const earningsSchema = new mongoose.Schema({
    interviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Earnings = mongoose.model("Earnings", earningsSchema);
export default Earnings;  // ✅ Default export
