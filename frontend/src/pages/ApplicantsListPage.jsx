
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import {
//   fetchApplicantsForJob,
//   scheduleInterview,
//   resetApplicants,
//   fetchInterviewsForJob,
// } from "../store/slices/interviewSlice";
// import { Link } from "react-router-dom";
// import "react-datepicker/dist/react-datepicker.css";
// import ReactModal from "react-modal";
// import { Button } from "react-bootstrap";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { useGoogleLogin } from "@react-oauth/google";
// import "../components/ui/list.css";
// import { selectApplicants } from "../store/slices/interviewSlice";

// const ApplicantsListPage = () => {
//   const { jobId } = useParams();
//   const dispatch = useDispatch();
//   // const interviewStatus = useSelector((state) => state.interviews.status || {});
//   const interviews = useSelector((state) => state.interviews.interviews || []);
//   const applicants = useSelector(selectApplicants);
//   const [interviewDate, setInterviewDate] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedApplicant, setSelectedApplicant] = useState(null);
//   const [accessToken, setAccessToken] = useState(null);

//   useEffect(() => {
//     if (document.getElementById("root")) {
//       ReactModal.setAppElement("#root");
//     }
//   }, []);

//   useEffect(() => {
//     if (jobId) {
//       dispatch(resetApplicants());
//       dispatch(fetchApplicantsForJob(jobId));
//       // dispatch(fetchInterviewsForJob(jobId)); // Fetch existing interviews
//     }
//   }, [dispatch, jobId]);
//   useEffect(() => {
//     if (jobId && applicants.length > 0) {
//       applicants.forEach((applicant) => {
//         dispatch(fetchInterviewsForJob({ jobId, applicantId: applicant._id }));
//       });
//     }
//   }, [dispatch, jobId, applicants]);

//   const login = useGoogleLogin({
//     onSuccess: (tokenResponse) => {
//       console.log("Access Token:", tokenResponse.access_token);
//       setAccessToken(tokenResponse.access_token);
//     },
//     onError: (error) => console.error("Login Failed:", error),
//     scope: "https://www.googleapis.com/auth/calendar",
//   });

//   const handleScheduleInterview = () => {
//     if (!interviewDate) {
//       alert("Please select a date and time for the interview.");
//       return;
//     }

//     if (!accessToken) {
//       alert("Please log in with Google first.");
//       return;
//     }

//     dispatch(
//       scheduleInterview({
//         applicantId: selectedApplicant._id,
//         applicantEmail: selectedApplicant.email,
//         jobId,
//         interviewDate,
//         accessToken,
//       })
//     )
//       .then((result) => {
//         if (result.payload?.success) {
//           setShowModal(false);
          
//           // Refresh interviews list
//           dispatch(
//             fetchInterviewsForJob({
//               jobId,
//               applicantId: selectedApplicant._id,
//             })
//           );
//         }
//         setShowModal(false);
//       })
//       .catch((error) => {
//         console.error("Failed to schedule interview:", error);
//         alert(error.payload?.message || "Failed to schedule interview");
//       });
//   };

//   const handleShowModal = (applicant) => {
//     setSelectedApplicant(applicant);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   // Filter applicants to exclude deleted ones
//   const filteredApplicants = applicants.filter(
//     (applicant) =>
//       !(applicant.deletedBy?.jobSeeker || applicant.deletedBy?.employer)
//   );

//   // Function to check if an applicant has an interview and its status
//   const getInterviewStatus = (applicantId) => {
//     // Filter out any undefined interviews first
//     const validInterviews = interviews.filter((i) => i !== undefined);

//     // Find interview for this applicant and job
//     const interview = validInterviews.find(
//       (i) => i.applicantId === applicantId && i.jobId === jobId
//     );

//     if (!interview) return "Not Scheduled";

//     // Map backend status to display text
//     const statusMap = {
//       Pending: "Pending",
//       Scheduled: "Scheduled",
//       Completed: "Completed",
//       Shortlisted: "Shortlisted",
//       Rejected: "Rejected",
//     };

//     return statusMap[interview.status] || "Unknown Status";
//   };
//   console.log("applicant", filteredApplicants);

//   return (
//     <section className="jobs">
//       <div className="p-6">
//         <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
//           Applicants List
//         </h1>

//         <div className="jobs_container">
//           {filteredApplicants.length > 0 ? (
//             filteredApplicants.map((applicant) => {
//               const interviewStatus = getInterviewStatus(applicant._id);

//               return (
//                 <div className="card shadow-lg" key={applicant._id}>
//                   <p className="title font-bold text-lg">{applicant.name}</p>
//                   <p className="company">
//                     <strong>Email:</strong> {applicant.email}
//                   </p>
//                   <p className="location">
//                     <strong>Phone:</strong> {applicant.phone}
//                   </p>

//                   <div className="btn-wrapper">
//                     <Link
//                       to={applicant?.resume?.url || "#"}
//                       className="btn bg-success text-white"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       View Resume
//                     </Link>

//                     <Button
//                       variant={
//                         interviewStatus === "Not Scheduled"
//                           ? "primary"
//                           : interviewStatus === "Rejected"
//                           ? "danger"
//                           : interviewStatus === "Shortlisted"
//                           ? "success"
//                           : "secondary"
//                       }
//                       onClick={() => handleShowModal(applicant)}
//                       disabled={
//                         interviewStatus !== "Not Scheduled" 
//                         // || // Disable if status is anything other than "Not Scheduled"
//                         // (selectedApplicant &&
//                         //   selectedApplicant._id === applicant._id) // Optional: disable while processing
//                       }
//                     >
//                       {interviewStatus === "Not Scheduled"
//                         ? "Schedule Interview"
//                         : interviewStatus}
//                     </Button>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <img
//               src="./notfound.png"
//               alt="applicants-not-found"
//               style={{ width: "100%" }}
//             />
//           )}
//         </div>
//       </div>

//       {/* Google Login Button */}
//       <button onClick={() => login()} disabled={accessToken}>
//         {accessToken ? "Logged in" : "Login with Google"}
//       </button>

//       {/* Interview Scheduling Modal */}
//       <ReactModal
//         isOpen={showModal}
//         onRequestClose={closeModal}
//         contentLabel="Schedule Interview Modal"
//       >
//         <div className="modal-body">
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DateTimePicker
//               label="Select Interview Date"
//               value={interviewDate}
//               onChange={setInterviewDate}
//             />
//           </LocalizationProvider>
//         </div>
//         <div className="modal-footer">
//           <button className="btn btn-secondary" onClick={closeModal}>
//             Cancel
//           </button>
//           <button className="btn btn-primary" onClick={handleScheduleInterview}>
//             Confirm Slot
//           </button>
//         </div>
//       </ReactModal>
//     </section>
//   );
// };

// export default ApplicantsListPage;



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchApplicantsForJob,
  scheduleInterview,
  resetApplicants,
  fetchInterviewsForJob,
} from "../store/slices/interviewSlice";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import ReactModal from "react-modal";
import { Button } from "react-bootstrap";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useGoogleLogin } from "@react-oauth/google";
import "../components/ui/list.css";
import { selectApplicants } from "../store/slices/interviewSlice";
import notFoundImage from "../../assets/notfound.png";
// Modal styles
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    maxWidth: '90%',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: 'none'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000
  }
};

const ApplicantsListPage = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const interviews = useSelector((state) => state.interviews.interviews || []);
  const applicants = useSelector(selectApplicants);
  const [interviewDate, setInterviewDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false); // Track if interview is being scheduled

  useEffect(() => {
    if (document.getElementById("root")) {
      ReactModal.setAppElement("#root");
    }
  }, []);

  useEffect(() => {
    if (jobId) {
      dispatch(resetApplicants());
      dispatch(fetchApplicantsForJob(jobId));
    }
  }, [dispatch, jobId]);

  useEffect(() => {
    if (jobId && applicants.length > 0) {
      applicants.forEach((applicant) => {
        dispatch(fetchInterviewsForJob({ jobId, applicantId: applicant._id }));
      });
    }
  }, [dispatch, jobId, applicants]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Access Token:", tokenResponse.access_token);
      setAccessToken(tokenResponse.access_token);
    },
    onError: (error) => console.error("Login Failed:", error),
    scope: "https://www.googleapis.com/auth/calendar",
  });

  // const handleScheduleInterview = () => {
  //   if (!interviewDate) {
  //     alert("Please select a date and time for the interview.");
  //     return;
  //   }

  //   if (!accessToken) {
  //     alert("Please log in with Google first.");
  //     return;
  //   }

  //   setIsProcessing(true);
  //   dispatch(
  //     scheduleInterview({
  //       applicantId: selectedApplicant?._id,
  //       applicantEmail: selectedApplicant?.email,
  //       jobId,
  //       interviewDate,
  //       accessToken,
  //     })
  //   )
  //     .then((result) => {
  //       if (result.payload?.success) {
  //         setShowModal(false);
  //         dispatch(
  //           fetchInterviewsForJob({
  //             jobId,
  //             applicantId: selectedApplicant._id,
  //           })
  //         );
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Failed to schedule interview:", error);
  //       alert(error.payload?.message || "Failed to schedule interview");
  //     })
  //     .finally(() => {
  //       setIsProcessing(false);
  //       setShowModal(false);
  //     });
  // };



  const handleScheduleInterview = async () => {
    
    if (!interviewDate) {
      alert("Please select a date and time for the interview.");
      return;
    }
  
    if (!accessToken) {
      alert("Please log in with Google first.");
      return;
    }
  
    setIsProcessing(true);
    try {
      const result = await dispatch(
        scheduleInterview({
          applicantId: selectedApplicant?._id,
          applicantEmail: selectedApplicant?.email,
          jobId,
          interviewDate,
          accessToken,
        })
      );
  
      if (result.payload?.success) {
        setShowModal(false);
        // Prepare email content
        const subject = `Interview Scheduled for ${selectedApplicant?.name}`;
        const message = `Dear ${selectedApplicant?.name},\n\nYour interview has been scheduled for ${new Date(interviewDate).toLocaleString()}.\n\nPlease be prepared with any necessary materials and join on time.\n\nBest regards,\nThe Hiring Team`;
  
        try {
          // Send email using your existing system
          await fetch('/api/v1/interview/send-interview-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: selectedApplicant?.email,
              subject,
              message,
              applicantName: selectedApplicant?.name,
              
            }),
          });
        } catch (emailError) {
          console.error('Error sending email:', emailError);
          // Email failed but we'll still proceed
        }
  
        // Close modal and refresh data
        setShowModal(false);
        setSelectedApplicant(null);
        dispatch(fetchInterviewsForJob({ jobId, applicantId: selectedApplicant._id }));
      }
    } catch (error) {
      console.error("Failed to schedule interview:", error);
      alert(error.payload?.message || "Failed to schedule interview");
    } finally {
      setIsProcessing(false);
    }
  };
  const handleShowModal = (applicant) => {
    setSelectedApplicant(applicant);
    setShowModal(true);
    setInterviewDate(null); // Reset date when opening modal
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedApplicant(null); // Reset selected applicant when closing
  };

  const filteredApplicants = applicants.filter(
    (applicant) =>
      !(applicant.deletedBy?.jobSeeker || applicant.deletedBy?.employer)
  );

  const getInterviewStatus = (applicantId) => {
    const validInterviews = interviews.filter((i) => i !== undefined);
    const interview = validInterviews.find(
      (i) => i.applicantId === applicantId && i.jobId === jobId
    );

    if (!interview) return "Not Scheduled";

    const statusMap = {
      Pending: "Pending",
      Scheduled: "Scheduled",
      Completed: "Completed",
      Shortlisted: "Shortlisted",
      Rejected: "Rejected",
    };

    return statusMap[interview.status] || "Unknown Status";
  };

  return (
    <section className="jobs">
      <div className="p-6">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Applicants List
        </h1>

        <div className="jobs_container">
          {filteredApplicants.length > 0 ? (
            filteredApplicants.map((applicant) => {
              const interviewStatus = getInterviewStatus(applicant._id);
              const isCurrentApplicantSelected = selectedApplicant?._id === applicant._id;

              return (
                <div className="card shadow-lg" key={applicant._id}>
                  <p className="title font-bold text-lg">{applicant.name}</p>
                  <p className="company">
                    <strong>Email:</strong> {applicant.email}
                  </p>
                  <p className="location">
                    <strong>Phone:</strong> {applicant.phone}
                  </p>

                  <div className="btn-wrapper">
                    <Link
                      to={applicant?.resume?.url || "#"}
                      className="btn bg-success text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </Link>

                    <Button
                      variant={
                        interviewStatus === "Not Scheduled"
                          ? "primary"
                          : interviewStatus === "Rejected"
                          ? "danger"
                          : interviewStatus === "Shortlisted"
                          ? "success"
                          : "secondary"
                      }
                      onClick={() => handleShowModal(applicant)}
                      disabled={
                        interviewStatus !== "Not Scheduled" || 
                        (isProcessing && isCurrentApplicantSelected)
                      }
                    >
                      {interviewStatus === "Not Scheduled"
                        ? "Schedule Interview"
                        : interviewStatus}
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            // <img
            //   src="./notfound.png"
            //   alt="applicants-not-found"
            //   style={{ width: "100%" }}
            // />
            <img src={notFoundImage} alt="job-not-found" style={{width: "50%"}}/>
          )}
        </div>
      </div>

      {/* Google Login Button */}
      <div className="text-center mt-4">
        <button 
          onClick={() => login()} 
          disabled={accessToken}
          className={`px-4 py-2 rounded-md ${accessToken ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          {accessToken ? "Google Calendar Connected" : "Connect Google Calendar"}
        </button>
      </div>

      {/* Interview Scheduling Modal */}
      <ReactModal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Schedule Interview Modal"
        style={customStyles}
        shouldCloseOnOverlayClick={true}
      >
        <h2 className="text-xl font-bold mb-4">Schedule Interview</h2>
        <div className="modal-body mb-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Select Interview Date"
              value={interviewDate}
              onChange={setInterviewDate}
              sx={{ width: '100%' }}
            />
          </LocalizationProvider>
        </div>
        <div className="modal-footer flex justify-end space-x-2">
          <button 
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            onClick={handleScheduleInterview}
            disabled={!interviewDate || isProcessing}
          >
            {isProcessing ? 'Scheduling...' : 'Confirm Slot'}
          </button>
        </div>
      </ReactModal>
    </section>
  );
};

export default ApplicantsListPage;