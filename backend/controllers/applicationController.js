import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";




export const getMultipleApplications = catchAsyncErrors(async (req, res, next) => {
  const { applicantIds } = req.body; // Expect an array of applicant IDs

  if (!Array.isArray(applicantIds) || applicantIds.length === 0) {
    return next(new ErrorHandler("No applicant IDs provided.", 400));
  }

  const validApplicantIds = applicantIds.filter(id => mongoose.Types.ObjectId.isValid(id));

  if (validApplicantIds.length === 0) {
    return next(new ErrorHandler("Invalid applicant IDs provided.", 400));
  }

  const applications = await Application.find({
    _id: { $in: validApplicantIds }
  });

  if (!applications || applications.length === 0) {
    return next(new ErrorHandler("No applications found for provided IDs.", 404));
  }

  res.status(200).json({
    success: true,
    applications,
  });
});


// export const postApplication = catchAsyncErrors(async (req, res, next) => {
//   const { id } = req.params;
//   const { name, email, phone, address, coverLetter } = req.body;

//   if (!name || !email || !phone || !address || !coverLetter) {
//       return next(new ErrorHandler("All fields are required.", 400));
//   }

//   const jobSeekerInfo = {
//       id: req.user._id,
//       name,
//       email,
//       phone,
//       address,
//       coverLetter,
//       role: "Job Seeker",
//   };

//   const jobDetails = await Job.findById(id);
//   if (!jobDetails) {
//       return next(new ErrorHandler("Job not found.", 404));
//   }

//   const isAlreadyApplied = await Application.findOne({
//       "jobInfo.jobId": id,
//       "jobSeekerInfo.id": req.user._id,
//   });

//   if (isAlreadyApplied) {
//       return next(
//           new ErrorHandler("You have already applied for this job.", 400)
//       );
//   }

//   const employerInfo = {
//       id: jobDetails.postedBy,
//       role: "Employer",
//   };

//   const jobInfo = {
//       jobId: id,
//       jobTitle: jobDetails.title,
//   };

//   const application = await Application.create({
//       jobSeekerInfo,
//       employerInfo,
//       jobInfo,   // ❗️ Removed `interviewerInfo` here
//   });

//   res.status(201).json({
//       success: true,
//       message: "Application submitted.",
//       application,
//   });
// });

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, coverLetter } = req.body;

    if (!name || !email || !phone || !address || !coverLetter) {
      return next(new ErrorHandler("All fields are required.", 400));
    }

    // Check if resume file was uploaded (same as user registration)
    if (!req.files || !req.files.resume) {
      return next(new ErrorHandler("Resume file is required.", 400));
    }

    const resumeFile = req.files.resume;

    // Upload resume to Cloudinary (same pattern as user registration)
    const cloudinaryResponse = await cloudinary.uploader.upload(
      resumeFile.tempFilePath,
      { 
        folder: "Job_Applications_Resumes", // Different folder than user profiles
        resource_type: "auto"
      }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return next(new ErrorHandler("Failed to upload resume to cloud.", 500));
    }

    const jobSeekerInfo = {
      id: req.user._id,
      name,
      email,
      phone,
      address,
      coverLetter,
      resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
      role: "Job Seeker",
    };

    // Rest of your existing application logic...
    const jobDetails = await Job.findById(id);
    if (!jobDetails) {
      return next(new ErrorHandler("Job not found.", 404));
    }

    const isAlreadyApplied = await Application.findOne({
      "jobInfo.jobId": id,
      "jobSeekerInfo.id": req.user._id,
    });

    if (isAlreadyApplied) {
      return next(
        new ErrorHandler("You have already applied for this job.", 400)
      );
    }

    const employerInfo = {
      id: jobDetails.postedBy,
      role: "Employer",
    };

    const jobInfo = {
      jobId: id,
      jobTitle: jobDetails.title,
    };

    const application = await Application.create({
      jobSeekerInfo,
      employerInfo,
      jobInfo,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted.",
      application,
    });
  } catch (error) {
    next(error);
  }
});
export const employerGetAllApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { _id } = req.user;
    const applications = await Application.find({
      "employerInfo.id": _id,
      "deletedBy.employer": false,
    });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobSeekerGetAllApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { _id } = req.user;
    const applications = await Application.find({
      "jobSeekerInfo.id": _id,
      "deletedBy.jobSeeker": false,
    });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedApplication = await Application.findOneAndDelete({ _id: id });

    if (!deletedApplication) {
      return next(new ErrorHandler("Application not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Application Deleted.",
    });
  } catch (error) {
    console.error("Error deleting application:", error);
    return next(new ErrorHandler("Failed to delete application.", 500));
  }
});
export const fetchApplicants = async (req, res) => {
  try {
    const applications = await Application.find().populate("jobId", "title companyName"); // Populate job details
    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getApplicantsForJob = catchAsyncErrors(async (req, res, next) => {
  const { jobId } = req.params;
  
  const applicants = await Application.find({
    "jobInfo.jobId": jobId,
    "deletedBy.employer": false
  }).populate("jobSeekerInfo.id", "name email phone");

  res.status(200).json({
    success: true,
    applicants
  });
});

export const updateApplicantStatus = catchAsyncErrors(async (req, res, next) => {
  const { applicantId } = req.params;
  const { status } = req.body;

  const updatedApplicant = await Application.findByIdAndUpdate(
    applicantId,
    { status },
    { new: true }
  );

  if (!updatedApplicant) {
    return next(new ErrorHandler("Applicant not found", 404));
  }

  res.status(200).json({
    success: true,
    applicant: updatedApplicant
  });
});
