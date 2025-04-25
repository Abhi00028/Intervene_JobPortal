
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInterviews, updateApplicantStatus } from "../store/slices/interviewSlice";
import { fetchSingleJob } from "../store/slices/jobSlice";
import { fetchMultipleApplications } from "../store/slices/applicationSlice";
import { Link } from "react-router-dom";
import { fetchEarnings } from "../store/slices/earningsSlice";
import Earnings from "./earning";
import "./ui/interviewdashboard.css"; // Custom styles

const InterviewerDashboard = () => {
    const dispatch = useDispatch();
    const { interviews, totalInterviews } = useSelector((state) => state.interviews);
    const { singleApplication } = useSelector((state) => state.applications);
    const { user } = useSelector((state) => state.user);
    const earnings = useSelector((state) => state.earnings);
    console.log("Earnings:", earnings);
    
    useEffect(() => {
        dispatch(fetchInterviews());
        dispatch(fetchEarnings(user?._id));
    }, [dispatch]);

    const [jobDetails, setJobDetails] = useState([]);

    // Fetch and log job details for each interview
    useEffect(() => {
        if (interviews.length > 0) {
            interviews.forEach((interview) => {
                const jobId = interview?.jobId?._id;
                if (jobId) {
                    dispatch(fetchSingleJob(jobId))
                        .then((response) => {
                            setJobDetails(response?.data?.job);
                        })
                        .catch((error) => {
                            console.error("Error fetching job details:", error.message || error);
                        });
                }
            });
        }
    }, [interviews, dispatch]);

    useEffect(() => {
        const uniqueApplicantIds = [
            ...new Set(interviews.map((interview) => interview?.applicantId?._id)),
        ];
        if (uniqueApplicantIds.length > 0) {
            dispatch(fetchMultipleApplications(uniqueApplicantIds));
        }
    }, [interviews, dispatch]);

    const handleStatusChange = (interviewId, currentStatus, newStatus) => {
        if (currentStatus === "Shortlisted" || currentStatus === "Rejected") {
            alert("Status cannot be changed once finalized!");
            return;
        }
        
        // dispatch(updateApplicantStatus({ interviewId, status: newStatus }))
        //     .then(() => dispatch(fetchInterviews()));  
        dispatch(updateApplicantStatus({ interviewId, status: newStatus }))
        .then(() => {
            // Re-fetch the earnings after status update
            dispatch(fetchEarnings(user._id));
            dispatch(fetchInterviews());
        }); 
    };

    return (
        <div className="dashboard-container">
            <h1 className="title">Interviewer Dashboard</h1>
            <h2 className="subtitle">Total Interviews Conducted: {totalInterviews}</h2>
            <Earnings /> {/* Display total earnings here */}
            <div className="payment-link">
                <Link to="/interviewer-payment-dashboard" state={{ earnings: earnings, interviewerID: user?._id }}>
                    <button className="payment-btn">Go to Payment Dashboard</button>
                </Link>
            </div>
            <div className="interviews-list">
                {interviews.map((interview) => {
                    const applicantData = singleApplication?.find(
                        (app) => app._id === interview.applicantId._id
                    );
                    return (
                        <div key={interview?._id} className="interview-card">
                            <h3>{applicantData?.jobSeekerInfo?.name}</h3>
                            <p>Email: {applicantData?.jobSeekerInfo?.email}</p>
                            <p>Phone: {applicantData?.jobSeekerInfo?.phone}</p>
                            <p>Resume: 
                                <a href={applicantData?.applicantId?.resume} target="_blank" rel="noopener noreferrer">
                                    View Resume
                                </a>
                            </p>
                            <hr />
                            <p><strong>Job Title:</strong> {interview?.jobId?.title}</p>
                            <p><strong>Employer:</strong> {jobDetails?.companyName}</p>
                            <hr />
                            <p><strong>Interviewed By:</strong> {user?.name}</p>
                            <p><strong>Interview Date:</strong> {new Date(interview?.conductedAt).toLocaleString()}</p>
                            <p><strong>Current Status:</strong>
                                <span className={`status-badge status-${applicantData?.status?.toLowerCase() || 'pending'}`}>
                                    {interview?.status || 'Pending'}
                                </span>
                            </p>
                            <div className="button-group">
                                <button 
                                    className="status-btn shortlist-btn" 
                                    onClick={() => handleStatusChange(interview?._id, interview?.status, "Shortlisted")}
                                    disabled={interview?.status === "Shortlisted" || interview?.status === "Rejected"}
                                >
                                    ✅ Shortlist
                                </button>
                                <button 
                                    className="status-btn reject-btn" 
                                    onClick={() => handleStatusChange(interview?._id, interview?.status, "Rejected")}
                                    disabled={interview?.status === "Shortlisted" || interview?.status === "Rejected"}
                                >
                                    ❌ Reject
                                </button>
                                <button 
                                    className="status-btn pending-btn" 
                                    onClick={() => handleStatusChange(interview?._id, interview?.status, "Pending")}
                                    disabled={interview?.status === "Shortlisted" || interview?.status === "Rejected"}
                                >
                                    ⏳ Pending
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InterviewerDashboard;
