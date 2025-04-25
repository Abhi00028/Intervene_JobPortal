import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { createSelector } from "reselect";
import { addEarnings } from "./earningsSlice"; 
const selectApplicantsState = (state) => state.interviews.applicants || [];

export const selectApplicants = createSelector(
    [selectApplicantsState],
    (applicants) => applicants
);



export const scheduleInterview = createAsyncThunk(
  "interviews/scheduleInterview",
  async ({ applicantEmail, interviewDate, accessToken, applicantId, jobId }, { rejectWithValue }) => {
      try {
          const response = await axios.post(
              "http://localhost:4000/api/v1/interview/schedule",
              { 
                applicantEmail, 
                interviewDate, 
                accessToken,
                applicantId,
                jobId 
              },
              {
                  headers: {
                      Authorization: `Bearer ${accessToken}`,
                  },
                  withCredentials: true,
              }
          );
          return {
            interview: response.data.interview,
            applicantId
          };
      } catch (error) {
          return rejectWithValue(error.response?.data || error.message);
      }
  }
);




export const fetchInterviews = createAsyncThunk("interviews/fetch", async () => {
    const { data } = await axios.get("http://localhost:4000/api/v1/interview/interviewer/interviews",
        { withCredentials: true }
    );
    return data;
});



export const fetchApplicantsForJob = createAsyncThunk(
    "applications/fetchForJob",
    async (jobId) => {
        const { data } = await axios.get(`http://localhost:4000/api/v1/interview/job/${jobId}/applicants`,
        { withCredentials: true }
        );
        
        return data.applicants;
    }
);

// Fetch interviews for a job
// Fetch interviews for a specific job and applicant
export const fetchInterviewsForJob = createAsyncThunk(
  "interviews/fetchInterviewsForJob",
  async ({ jobId, applicantId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/interview",
        {
          params: { jobId, applicantId },
          withCredentials: true
        }
      );
      
      // Return the interview object or null if not found
      return {
        jobId,
        applicantId,
        interview: response.data.interview // This will be null if no interview exists
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const updateApplicantStatus = createAsyncThunk(
  "interviews/updateStatus",
  async ({ interviewId, status }) => {
    await axios.patch(
      "http://localhost:4000/api/v1/interview/applicant/status",
      { interviewId, status },
      { withCredentials: true } // ✅ Ensure credentials are sent
    );
  }
);




  
const initialState = {
  interviews: [],
  totalInterviews: 0,
  applicants: [], 
  earnings: 0, // Store the list of applicants
};
const interviewSlice = createSlice({
  name: "interviews",
  initialState,
  reducers: {
    resetApplicants: (state) => {
        state.applicants = []; // ✅ Reset applicants when switching jobs
        state.interviewStatus = {}; // ✅ Also reset interview status
    },
    setInterviewScheduled: (state, action) => {
      const { applicantId } = action.payload;
      state.interviewStatus[applicantId] = true; // ✅ Mark interview as scheduled
    },
},
  extraReducers: (builder) => {
    builder
      // Fetching interviews
      .addCase(fetchInterviews.fulfilled, (state, action) => {
        state.interviews = action.payload.interviews;
        state.totalInterviews = action.payload.totalInterviews;
      })
      
      // Fetching applicants for a specific job
      .addCase(fetchApplicantsForJob.fulfilled, (state, action) => {
        state.applicants = action.payload.filter(
          (applicant) => 
              !(applicant.deletedBy?.jobSeeker || 
                applicant.deletedBy?.employer || 
                applicant.deletedBy?.interviewer)
      );
  })// Save applicants here
  


//   .addCase(updateApplicantStatus.fulfilled, (state, action) => {
//     const { applicantId, status } = action.meta.arg;

//     // ✅ Update status in interviews
//     const interviewIndex = state.interviews.findIndex(
//         (interview) => interview.applicantId._id === applicantId
//     );

//     if (interviewIndex !== -1) {
//         state.interviews[interviewIndex].status = status;
//     }

//     // ✅ Update status in applicants array for immediate UI change
//     const applicantIndex = state.applicants.findIndex(
//         (applicant) => applicant._id === applicantId
//     );

//     if (applicantIndex !== -1) {
//         state.applicants[applicantIndex].status = status;
//     }
// })


.addCase(fetchInterviewsForJob.fulfilled, (state, action) => {
  const { interview } = action.payload;
  
  if (interview) {
    // Filter out any undefined values first
    state.interviews = state.interviews.filter(i => i !== undefined);
    
    // Find if this interview already exists in state
    const existingIndex = state.interviews.findIndex(
      i => i && i._id === interview._id
    );
    
    if (existingIndex >= 0) {
      // Update existing interview
      state.interviews[existingIndex] = interview;
    } else {
      // Add new interview
      state.interviews.push(interview);
    }
  }
})




.addCase(updateApplicantStatus.fulfilled, (state, action) => {
  const { applicantId, status } = action.meta.arg;
  console.log("Status change detected: ", applicantId, status);  // Debug log
  
  // ✅ Find the interview by applicantId
  const interview = state.interviews.find(interview => interview.applicantId._id === applicantId);

  if (interview) {
      // ✅ Prevent status update if already finalized
      if (interview.status === "Shortlisted" || interview.status === "Rejected") {
          console.log("Status already finalized, cannot change again.");
          return; // Do nothing if status is already set
      }

      // ✅ Update status
      interview.status = status;

      // ✅ Award $20 only if status is Shortlisted or Rejected
      if (status === "Shortlisted" || status === "Rejected") {
          console.log("Awarding $20 for interview", applicantId);
          state.earnings += 20;  // Increment earnings
      }
  }

  // ✅ Find and update applicant's status
  const applicant = state.applicants.find(applicant => applicant._id === applicantId);
  if (applicant) {
      applicant.status = status;
  }
})




      // Handling scheduling an interview
      .addCase(scheduleInterview.fulfilled, (state, action) => {
        const { applicantId, interviewData } = action.payload;

        // Update the applicants list to reflect that the interview is scheduled
        const applicantIndex = state.applicants.findIndex(
          (applicant) => applicant._id === applicantId
        );

        if (applicantIndex !== -1) {
          state.applicants[applicantIndex].interviewScheduled = true;
        }

        // Optionally: Add the new interview to the list of interviews
        state.interviews.push(interviewData);  // Add the interview data

        alert("Interview scheduled successfully and Email sent to the applicant.");
      })
      
      // Handle scheduling errors
      .addCase(scheduleInterview.rejected, (state, action) => {
        alert("Failed to schedule the interview.");
      });
  },
});



 
export const { resetApplicants , setInterviewScheduled } = interviewSlice.actions;


export default interviewSlice.reducer;