// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";



// const applicationSlice = createSlice({
//   name: "applications",
//   initialState: {
//     applications: [],
//     loading: false,
//     error: null,
//     message: null,
//     singleApplication: null,
//   },
//   reducers: {
//     requestForAllApplications(state, action) {
//       state.loading = true;
//       state.error = null;
//     },
//     successForAllApplications(state, action) {
//       state.loading = false;
//       state.error = null;
//       state.applications = action.payload;
//     },
//     failureForAllApplications(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     requestForMyApplications(state, action) {
//       state.loading = true;
//       state.error = null;
//     },
//     successForMyApplications(state, action) {
//       state.loading = false;
//       state.error = null;
//       state.applications = action.payload;
//     },
//     failureForMyApplications(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     requestForPostApplication(state, action) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     successForPostApplication(state, action) {
//       state.loading = false;
//       state.error = null;
//       state.message = action.payload;
//     },
//     failureForPostApplication(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//       state.message = null;
//     },
//     requestForDeleteApplication(state, action) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     successForDeleteApplication(state, action) {
//       state.loading = false;
//       state.error = null;
//       state.message = action.payload;
//     },
//     failureForDeleteApplication(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//       state.message = null;
//     },

//     clearAllErrors(state, action) {
//       state.error = null;
//       state.applications = state.applications;
//     },
//     resetApplicationSlice(state, action) {
//       state.error = null;
//       state.applications = state.applications;
//       state.message = null;
//       state.loading = false;
//     },
//     fetchApplicantsRequest(state, action) {
//       state.loading = true;
//     },
//     fetchApplicantsSuccess(state, action) {
//       state.loading = false;
//       state.applicants = action.payload;
//     },
//     fetchApplicantsFailed(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     scheduleInterviewRequest(state, action) {
//       state.loading = true;
//     },
//     scheduleInterviewSuccess(state, action) {
//       state.loading = false;
//       state.message = action.payload;
//     },
//     scheduleInterviewFailed(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     requestForSingleApplication(state, action) {
//       state.loading = true;
//       state.error = null;
//     },
//     successForSingleApplication(state, action) {
//       state.loading = false;
//       state.error = null;
//       state.singleApplication = action.payload;
//     },
//     failureForSingleApplication(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });


// export const fetchMultipleApplications = (applicantIds) => async (dispatch) => {
//   dispatch(applicationSlice.actions.requestForSingleApplication());
//   try {
//     const response = await axios.post(
//       `http://localhost:4000/api/v1/application/getMultiple`, // New route for multiple applications
//       { applicantIds }, 
//       { withCredentials: true }
//     );
//     dispatch(applicationSlice.actions.successForSingleApplication(response.data.applications));
//   } catch (error) {
//     dispatch(applicationSlice.actions.failureForSingleApplication(error.response?.data?.message || "Failed to fetch application details"));
//   }
// };





// // Add the new action
// export const fetchSingleApplication = (applicantId) => async (dispatch) => {
//   dispatch(applicationSlice.actions.requestForSingleApplication());
//   try {
//     const response = await axios.get(
//       `http://localhost:4000/api/v1/application/get/${applicantId}`,
//       { withCredentials: true }
//     );
//     dispatch(applicationSlice.actions.successForSingleApplication(response.data?.application));
//   } catch (error) {
//     dispatch(applicationSlice.actions.failureForSingleApplication(error.response?.data?.message || "Failed to fetch application details"));
//   }
// };




// export const fetchApplicants = () => async (dispatch) => {
//   dispatch(applicationSlice.actions.fetchApplicantsRequest());
//   try {
//     const response = await axios.get(
//       "http://localhost:4000/api/v1/applications",
//       { withCredentials: true }
//     );
//     dispatch(applicationSlice.actions.fetchApplicantsSuccess(response.data));
//   } catch (error) {
//     dispatch(applicationSlice.actions.fetchApplicantsFailed(error.response.data.message));
//   }
// };

// export const scheduleInterview = (applicantId, data) => async (dispatch) => {
//   dispatch(applicationSlice.actions.scheduleInterviewRequest());
//   try {
//     const response = await axios.post(
//       `http://localhost:4000/api/v1/applications/schedule/${applicantId}`,
//       data,
//       { withCredentials: true }
//     );
//     dispatch(applicationSlice.actions.scheduleInterviewSuccess(response.data.message));
//   } catch (error) {
//     dispatch(applicationSlice.actions.scheduleInterviewFailed(error.response.data.message));
//   }
// };


// export const fetchEmployerApplications = () => async (dispatch) => {
//   dispatch(applicationSlice.actions.requestForAllApplications());
//   try {
//     const response = await axios.get(
//       `http://localhost:4000/api/v1/application/employer/getall`,
//       {
//         withCredentials: true,
//       }
//     );
//     dispatch(
//       applicationSlice.actions.successForAllApplications(
//         response.data.applications
//       )
//     );
//     dispatch(applicationSlice.actions.clearAllErrors());
//   } catch (error) {
//     dispatch(
//       applicationSlice.actions.failureForAllApplications(
//         error.response.data.message
//       )
//     );
//   }
// };

// export const fetchJobSeekerApplications = () => async (dispatch) => {
//   dispatch(applicationSlice.actions.requestForMyApplications());
//   try {
//     const response = await axios.get(
//       `http://localhost:4000/api/v1/application/jobseeker/getall`,
//       {
//         withCredentials: true,
//       }
//     );
//     dispatch(
//       applicationSlice.actions.successForMyApplications(
//         response.data.applications
//       )
//     );
//     dispatch(applicationSlice.actions.clearAllErrors());
//   } catch (error) {
//     dispatch(
//       applicationSlice.actions.failureForMyApplications(
//         error.response.data.message
//       )
//     );
//   }
// };

// export const postApplication = (data, jobId) => async (dispatch) => {
//   dispatch(applicationSlice.actions.requestForPostApplication());
//   try {
//     const response = await axios.post(
//       `http://localhost:4000/api/v1/application/post/${jobId}`,
//       data,
//       {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );
//     dispatch(
//       applicationSlice.actions.successForPostApplication(response.data.message)
//     );
//     dispatch(applicationSlice.actions.clearAllErrors());
//   } catch (error) {
//     dispatch(
//       applicationSlice.actions.failureForPostApplication(
//         error.response.data.message
//       )
//     );
//   }
// };

// export const deleteApplication = (id) => async (dispatch) => {
//   dispatch(applicationSlice.actions.requestForDeleteApplication());
//   try {
//     const response = await axios.delete(
//       `http://localhost:4000/api/v1/application/delete/${id}`,
//       { withCredentials: true }
//     );
//     dispatch(
//       applicationSlice.actions.successForDeleteApplication(
//         response.data.message
//       )
//     );
//     dispatch(clearAllApplicationErrors());
//   } catch (error) {
//     dispatch(
//       applicationSlice.actions.failureForDeleteApplication(
//         error.response.data.message
//       )
//     );
//   }
// };

// export const clearAllApplicationErrors = () => (dispatch) => {
//   dispatch(applicationSlice.actions.clearAllErrors());
// };

// export const resetApplicationSlice = () => (dispatch) => {
//   dispatch(applicationSlice.actions.resetApplicationSlice());
// };

// export default applicationSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [],
    applicants: [],
    interviews: [],
    loading: false,
    error: null,
    message: null,
    singleApplication: null,
  },
  reducers: {
    setApplicants: (state, action) => {
      state.applicants = action.payload;
    },
    updateApplicantStatus: (state, action) => {
      const { applicantId, status } = action.payload;
      const applicant = state.applicants.find(app => app._id === applicantId);
      if (applicant) {
        applicant.status = status;
      }
    },
    requestForAllApplications(state, action) {
      state.loading = true;
      state.error = null;
    },
    successForAllApplications(state, action) {
      state.loading = false;
      state.error = null;
      state.applications = action.payload;
    },
    failureForAllApplications(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForMyApplications(state, action) {
      state.loading = true;
      state.error = null;
    },
    successForMyApplications(state, action) {
      state.loading = false;
      state.error = null;
      state.applications = action.payload;
    },
    failureForMyApplications(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForPostApplication(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForPostApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForPostApplication(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    requestForDeleteApplication(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForDeleteApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForDeleteApplication(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllErrors(state, action) {
      state.error = null;
    },
    resetApplicationSlice(state, action) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
    fetchApplicantsRequest(state, action) {
      state.loading = true;
    },
    fetchApplicantsSuccess(state, action) {
      state.loading = false;
      state.applicants = action.payload;
    },
    fetchApplicantsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchInterviewsRequest(state, action) {
      state.loading = true;
    },
    fetchInterviewsSuccess(state, action) {
      state.loading = false;
      state.interviews = action.payload;
    },
    fetchInterviewsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    scheduleInterviewRequest(state, action) {
      state.loading = true;
    },
    scheduleInterviewSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    scheduleInterviewFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForSingleApplication(state, action) {
      state.loading = true;
      state.error = null;
    },
    successForSingleApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.singleApplication = action.payload;
    },
    failureForSingleApplication(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      // Handle fetchApplicantsForJob
      .addCase(fetchApplicantsForJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicantsForJob.fulfilled, (state, action) => {
        state.loading = false;
        state.applicants = action.payload;
        state.error = null;
      })
      .addCase(fetchApplicantsForJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle updateApplicantStatus
      .addCase(updateApplicantStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateApplicantStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Status updated successfully";
        // Find and update the applicant in the applicants array
        const updatedApplicant = action.payload;
        const index = state.applicants.findIndex(
          app => app._id === updatedApplicant._id
        );
        if (index !== -1) {
          state.applicants[index] = updatedApplicant;
        }
      })
      .addCase(updateApplicantStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Action Creators
export const fetchMultipleApplications = (applicantIds) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForSingleApplication());
  try {
    const response = await axios.post(
      `http://localhost:4000/api/v1/application/getMultiple`,
      { applicantIds },
      { withCredentials: true }
    );
    dispatch(applicationSlice.actions.successForSingleApplication(response.data.applications));
  } catch (error) {
    dispatch(applicationSlice.actions.failureForSingleApplication(error.response?.data?.message || "Failed to fetch application details"));
  }
};

export const fetchSingleApplication = (applicantId) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForSingleApplication());
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/application/get/${applicantId}`,
      { withCredentials: true }
    );
    dispatch(applicationSlice.actions.successForSingleApplication(response.data?.application));
  } catch (error) {
    dispatch(applicationSlice.actions.failureForSingleApplication(error.response?.data?.message || "Failed to fetch application details"));
  }
};

export const fetchApplicantsForJob = createAsyncThunk(
  "applications/fetchForJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/application/job/${jobId}/applicants`,
        { withCredentials: true }
      );
      return data.applicants;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateApplicantStatus = createAsyncThunk(
  "applications/updateStatus",
  async ({ applicantId, status }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/application/applicant/${applicantId}/status`,
        { status },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const fetchInterviewStatus = (jobId) => async (dispatch) => {
  if (!jobId) {
    console.error("No jobId provided");
    return;
  }

  dispatch(applicationSlice.actions.fetchInterviewsRequest());
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/interview/job/${jobId}`,
      { withCredentials: true }
    );
    dispatch(applicationSlice.actions.fetchInterviewsSuccess(response.data.interviews));
  } catch (error) {
    dispatch(applicationSlice.actions.fetchInterviewsFailed(error.response?.data?.message || "Failed to fetch interview status"));
  }
};

export const scheduleInterview = (applicantId, data) => async (dispatch) => {
  dispatch(applicationSlice.actions.scheduleInterviewRequest());
  try {
    const response = await axios.post(
      `http://localhost:4000/api/v1/interview/schedule`,
      { applicantId, ...data },
      { withCredentials: true }
    );
    dispatch(applicationSlice.actions.scheduleInterviewSuccess(response.data.message));
  } catch (error) {
    dispatch(applicationSlice.actions.scheduleInterviewFailed(error.response?.data?.message || "Failed to schedule interview"));
  }
};

export const fetchEmployerApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForAllApplications());
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/application/employer/getall`,
      { withCredentials: true }
    );
    dispatch(applicationSlice.actions.successForAllApplications(response.data.applications));
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(applicationSlice.actions.failureForAllApplications(error.response.data.message));
  }
};

export const fetchJobSeekerApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForMyApplications());
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/application/jobseeker/getall`,
      { withCredentials: true }
    );
    dispatch(applicationSlice.actions.successForMyApplications(response.data.applications));
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(applicationSlice.actions.failureForMyApplications(error.response.data.message));
  }
};

export const postApplication = (data, jobId) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForPostApplication());
  try {
    const response = await axios.post(
      `http://localhost:4000/api/v1/application/post/${jobId}`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(applicationSlice.actions.successForPostApplication(response.data.message));
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(applicationSlice.actions.failureForPostApplication(error.response.data.message));
  }
};

export const deleteApplication = (id) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForDeleteApplication());
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/application/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(applicationSlice.actions.successForDeleteApplication(response.data.message));
    dispatch(clearAllApplicationErrors());
  } catch (error) {
    dispatch(applicationSlice.actions.failureForDeleteApplication(error.response.data.message));
  }
};

export const clearAllApplicationErrors = () => (dispatch) => {
  dispatch(applicationSlice.actions.clearAllErrors());
};

export const resetApplicationSlice = () => (dispatch) => {
  dispatch(applicationSlice.actions.resetApplicationSlice());
};

export default applicationSlice.reducer;