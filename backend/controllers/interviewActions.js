import axios from "axios";
import { toast } from "react-toastify";

// Fetch applicants for a specific job
export const fetchApplicantsForJob = (jobId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/job/${jobId}/applicants`);
    return data.applicants;
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to fetch applicants for this job"
    );
    throw error.response?.data?.message || "Failed to fetch applicants";
  }
};

// Fetch interview status for applicants of a job
export const fetchInterviewStatus = (jobId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/interview/job/${jobId}`);
    return data.interviews;
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to fetch interview status"
    );
    throw error.response?.data?.message || "Failed to fetch interviews";
  }
};