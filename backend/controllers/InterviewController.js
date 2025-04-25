import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Interview } from "../models/interviewSchema.js"; // New model for interviews
import { oauth2Client } from '../utils/googleAuth.js';
import { google } from 'googleapis';
import  Earnings  from "../models/earningsSchema.js";

// import axios from 'axios';


// InterviewController.js

// Schedule an interview for an applicant
import { sendEmail } from "../utils/sendEmail.js";  // Ensure this import is correct

// Schedule an interview for an applicant
// export const scheduleInterview = catchAsyncErrors(async (req, res, next) => {
//     const { applicantId, jobId, interviewDate } = req.body;

//     // Validate required fields
//     if (!applicantId || !jobId || !interviewDate) {
//         return next(new ErrorHandler("Missing required fields.", 400));
//     }

//     // Check if applicant exists for this job
//     const application = await Application.findOne({ _id: applicantId, "jobInfo.jobId": jobId });
//     if (!application) {
//         return next(new ErrorHandler("Applicant not found for this job.", 404));
//     }

//     // Get the applicant's email from the application
//     const applicant = application.jobSeekerInfo;  // Adjust according to your schema
//     const candidateEmail = applicant.email; // Get the email of the applicant

//     // Generate interview link
//     const interviewLink = `https://hakkerrankinterview.com/interview?jobId=${jobId}&applicantId=${applicantId}`;

//     // Create a new interview record
//     const interview = new Interview({
//         applicantId,    // Applicant's ID
//         jobId,          // Job's ID
//         interviewerId: req.user._id, // The ID of the logged-in interviewer
//         interviewDate,  // Interview date
//         interviewLink,  // Interview link
//     });
//     await interview.save();

//     // Prepare the email message
//     const subject = "Interview Scheduled";
//     const message = `
//         Hello ${applicant.name},
//         Your interview has been scheduled for ${interviewDate}.
//         Please join the interview using the following link:
//         <a href="${interviewLink}">${interviewLink}</a>
//         Good luck!
//     `;

//     // Send the interview notification email
//     await sendEmail({
//         email: candidateEmail,
//         subject: subject,
//         message: message,
//     });

//     // Respond with a success message
//     res.status(200).json({
//         success: true,
//         message: "Interview scheduled and email notification sent.",
//     });
// });


export const scheduleInterview = async (req, res, next) => {
    try {
        const { applicantEmail, interviewDate, accessToken, applicantId, jobId } = req.body;
        
        // Debug: Log the entire request object
        console.log("Request User:", req.user);
        
        // Get interviewer ID from authenticated user
        const interviewerId = req.user._id;
        
        if (!interviewerId) {
            return next(new ErrorHandler("Interviewer ID not found in authentication", 401));
        }

        if (!accessToken) {
            return next(new ErrorHandler("Missing Google access token", 400));
        }

        // Verify applicant exists
        const application = await Application.findById(applicantId);
        if (!application) {
            return next(new ErrorHandler("Applicant not found", 404));
        }

        // Set up Google Calendar API
        oauth2Client.setCredentials({ access_token: accessToken });
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        // Create calendar event
        const event = {
            summary: 'Job Interview',
            description: `Interview for ${application.jobSeekerInfo.name}`,
            start: { dateTime: interviewDate, timeZone: 'UTC' },
            end: { dateTime: new Date(new Date(interviewDate).getTime() + 30 * 60000).toISOString(), timeZone: 'UTC' },
            attendees: [{ email: applicantEmail }],
            conferenceData: {
                createRequest: { 
                    requestId: `interview-${Date.now()}`,
                    conferenceSolutionKey: { type: 'hangoutsMeet' } 
                },
            },
        };

        // Create Google Calendar event
        const calendarResponse = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
            conferenceDataVersion: 1,
        });

        // Create and save interview record
        const interview = new Interview({
            interviewerId,
            applicantId,
            jobId,
            status: "Scheduled",
            meetLink: calendarResponse.data.hangoutLink,
            interviewDate: new Date(interviewDate),
            createdBy: interviewerId
        });

        await interview.save();

        // Update application status
        application.status = "Interview Scheduled";
        await application.save();

        res.status(200).json({ 
            success: true,
            interview: {
                _id: interview._id,
                interviewerId,
                applicantId,
                jobId,
                status: "Scheduled",
                meetLink: calendarResponse.data.hangoutLink,
                interviewDate
            }
        });

    } catch (error) {
        console.error('Error in scheduleInterview:', error);
        next(new ErrorHandler(error.message, 500));
    }
};
// Fetch Interviews Conducted by Interviewer
export const fetchInterviewsByInterviewer = catchAsyncErrors(async (req, res, next) => {
    const { _id } = req.user;

    const interviews = await Interview.find({ interviewerId: _id })
        .populate("applicantId", "name email")
        .populate("jobId", "title");

    res.status(200).json({
        success: true,
        totalInterviews: interviews.length,
        interviews,
    });
});

// Mark Applicant's Status
// InterviewController.js

export const updateApplicantStatus = catchAsyncErrors(async (req, res, next) => {
    const { interviewId, status } = req.body;  // ✅ Using `interviewId`

    // ✅ Correctly search by `interviewId`
    const interview = await Interview.findByIdAndUpdate(
        interviewId,                  // ✅ Find interview by `interviewId`
        { $set: { status } },         // ✅ Update status in `Interview` schema
        { new: true }                 // ✅ Return updated document
    );

    if (!interview) {
        return next(new ErrorHandler("Interview record not found", 404));
    }
    if (status === "Shortlisted" || status === "Rejected") {
        let earningsRecord = await Earnings.findOne({ interviewerId: interview.interviewerId });

        if (earningsRecord) {
            earningsRecord.amount += 20; // Add $20 for the interview
            await earningsRecord.save();
        } else {
            await Earnings.create({ interviewerId: interview.interviewerId, amount: 20 });
        }
    }
    res.status(200).json({
        success: true,
        message: `status updated to ${status}.`,
    });
});

export const getEarnings = catchAsyncErrors(async (req, res, next) => {
    const { _id } = req.user; // Get logged-in interviewer ID

    const earningsRecord = await Earnings.findOne({ interviewerId: _id });

    res.status(200).json({
        success: true,
        totalEarnings: earningsRecord ? earningsRecord.amount : 0,
    });
});


// Fetch Applicants for a Specific Job
export const fetchApplicantsForJob = catchAsyncErrors(async (req, res, next) => {
    const { jobId } = req.params;

    const applications = await Application.find({ "jobInfo.jobId": jobId })
        .populate("jobSeekerInfo.id", "name email");
console.log("Applications:", applications);

    if (!applications || applications.length === 0) {
        return res.status(404).json({ message: "No applicants found for this job." });
    }

    res.status(200).json({
        success: true,
        applicants: applications.map((app) => ({
            _id: app._id,
            name: app.jobSeekerInfo.name,
            email: app.jobSeekerInfo.email,
            phone: app.jobSeekerInfo.phone,
            address: app.jobSeekerInfo.address,
            resume: app.jobSeekerInfo.resume,
            jobInfo: app.jobInfo,
        })),
    });
});
