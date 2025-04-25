import express from "express";
import {
    fetchInterviewsByInterviewer,
    updateApplicantStatus,
    fetchApplicantsForJob,
    scheduleInterview
} from "../controllers/InterviewController.js";
import { Interview } from "../models/interviewSchema.js";
import { isAuthenticated, isInterviewer } from "../middlewares/auth.js";
import { getGoogleAuthURL, getGoogleTokens, setGoogleAuthCredentials, calendar } from '../utils/googleAuth.js';
const router = express.Router();

// Routes
router.get("/interviewer/interviews", isAuthenticated, isInterviewer, fetchInterviewsByInterviewer);
router.patch("/applicant/status", isAuthenticated, isInterviewer, updateApplicantStatus);
router.get("/job/:jobId/applicants", isAuthenticated, isInterviewer, fetchApplicantsForJob);

// Get all interviews for a specific job
router.get("/job/:jobId", isAuthenticated, async (req, res, next) => {
    try {
      const interviews = await Interview.find({ jobId: req.params.jobId })
        .populate("applicantId", "jobSeekerInfo.name jobSeekerInfo.email")
        .populate("interviewerId", "name email");
  
      res.status(200).json({
        success: true,
        interviews,
      });
    } catch (error) {
      next(error);
    }
  });

// interviewRoutes.js

router.post("/schedule", isAuthenticated, isInterviewer, scheduleInterview);

// Step 1: Redirect user to Google OAuth
router.get('/auth/google', (req, res) => {
    res.redirect(getGoogleAuthURL());
});


// Step 2: Handle Google OAuth Callback
router.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    if (!code) return res.status(400).send('Authorization code not found');

    try {
        const tokens = await getGoogleTokens(code);
        setGoogleAuthCredentials(tokens);

        // Store tokens securely (DB or session)
        res.send('Google OAuth Success! Tokens acquired.');
    } catch (error) {
        console.error(error);
        res.status(500).send('OAuth Failed');
    }
});

router.get("/", isAuthenticated, isInterviewer, async (req, res, next) => {
    const { jobId, applicantId } = req.query;
    
    if (!jobId || !applicantId) {
        return next(new ErrorHandler("Both jobId and applicantId are required", 400));
    }

    try {
        const interview = await Interview.findOne({
            jobId,
            applicantId
        });

        if (!interview) {
            return res.status(200).json({
                success: true,
                interview: null
            });
        }

        res.status(200).json({
            success: true,
            interview
        });
    } catch (error) {
        next(error);
    }
});

export default router;
