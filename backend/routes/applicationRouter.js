import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  deleteApplication,
  employerGetAllApplication,
  jobSeekerGetAllApplication,
  postApplication,
  fetchApplicants,
  // getSingleApplication, 
  getApplicantsForJob,
  updateApplicantStatus,
  getMultipleApplications,
} from "../controllers/applicationController.js";

const router = express.Router();

// const { fetchApplicants } = require("../controllers/applicationController");


// router.get(
//   "/job/:jobId/applicants",
//   isAuthenticated,
//   isAuthorized("Employer"),
//   async (req, res, next) => {
//     try {
//       const applications = await Application.find({
//         "jobInfo.jobId": req.params.jobId,
//         "deletedBy.employer": false
//       }).populate("jobSeekerInfo.id", "name email");
      
//       res.status(200).json({
//         success: true,
//         applicants: applications
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// );
router.get(
  "/job/:jobId/applicants",
  isAuthenticated,
  isAuthorized("Employer"),
  getApplicantsForJob
);

router.put(
  "/applicant/:applicantId/status",
  isAuthenticated,
  isAuthorized("Employer"),
  updateApplicantStatus
);

// Fetch all applicants for a job
router.get("/applications", fetchApplicants);

router.post(
  "/post/:id",
  isAuthenticated,
  isAuthorized("Job Seeker"),
  postApplication
);

router.get(
  "/employer/getall",
  isAuthenticated,
  isAuthorized("Employer"),
  employerGetAllApplication
);

router.get(
  "/jobseeker/getall",
  isAuthenticated,
  isAuthorized("Job Seeker"),
  jobSeekerGetAllApplication
);

router.delete("/delete/:id", isAuthenticated, deleteApplication);

// router.get("/get/:id", isAuthenticated, getSingleApplication);
router.post("/getMultiple", isAuthenticated, getMultipleApplications);


export default router;
