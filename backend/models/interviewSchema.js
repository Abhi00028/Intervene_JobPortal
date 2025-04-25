import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
    interviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: true,
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Scheduled", "Completed", "Shortlisted", "Rejected"],
        default: "Pending",
    },
    conductedAt: {
        type: Date,
        default: Date.now,
    },
    meetLink: String,
});

export const Interview = mongoose.model("Interview", interviewSchema);
