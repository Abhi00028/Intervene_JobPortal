

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchApplicantsForJob, fetchInterviewStatus } from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { Card, Badge } from "react-bootstrap";
import { FaUserTie, FaCalendarAlt, FaFileAlt, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./Tracking.css";

const ApplicantTracking = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const { applicants = [], interviews = [], loading, error, message } = useSelector((state) => state.applications);
  const [enhancedApplicants, setEnhancedApplicants] = useState([]);
  useEffect(() => {
    dispatch(fetchApplicantsForJob(jobId));
    dispatch(fetchInterviewStatus(jobId));
  }, [dispatch, jobId]);

  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
  }, [message, error]);


  useEffect(() => {
    if (applicants.length > 0 && interviews.length > 0) {
      const mergedData = applicants.map(applicant => {
        const interview = interviews.find(int => int.applicantId._id === applicant._id);
        return {
          ...applicant,
          interviewersInfo: interview ? {
            id: interview.interviewerId._id,
            name: interview.interviewerId.name,
            email: interview.interviewerId.email,
            role: "Interviewer" // You can modify this based on actual role
          } : null
        };
      });
      setEnhancedApplicants(mergedData);
    } else {
      setEnhancedApplicants(applicants);
    }
  }, [applicants, interviews]);

console.log("enhancedApplicants", enhancedApplicants);





  const renderStatusBar = (applicant) => {
    const interview = interviews.find(int => int.applicantId._id === applicant._id);
    const status = interview?.status || applicant.status || "Pending";
    
    const stages = [
      { name: "Applied", value: "Pending" },
      { name: "Screening", value: "Scheduled" },
      { name: "Interview", value: "Completed" },
      { name: "Final Decision", value: "Final" }
    ];

    let activeStage = 0;
    if (status === "Shortlisted" || status === "Rejected") {
      activeStage = 3;
    } else if (status === "Completed") {
      activeStage = 2;
    } else if (status === "Scheduled") {
      activeStage = 1;
    }

    // Determine if we should show shortlisted/rejected styling
    const isFinalDecision = status === "Shortlisted" || status === "Rejected";
    const finalStatusClass = isFinalDecision ? status.toLowerCase() : '';

    return (
      <div className={`status-bar ${finalStatusClass}`}>
        {stages.map((stage, index) => (
          <div 
            key={stage.value}
            className={`status-step ${index <= activeStage ? 'active' : ''} ${
              index === 3 && isFinalDecision ? finalStatusClass : ''
            }`}
          >
            <div className="step-circle"></div>
            <div className="step-label">{stage.name}</div>
            {index === 3 && isFinalDecision && (
              <div className="final-decision">{status}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  if (loading) return <Spinner />;
  if (error) return <div className="error-message">{error}</div>;


  return (
    <div className="applicant-tracking-container">
      <h2 className="tracking-header text-center mb-5">Applicants for Job #{jobId}</h2>
      {enhancedApplicants.length === 0 ? (
        <div className="text-center py-5">No applicants found</div>
      ) : (
        <div className="row g-4">
          {enhancedApplicants.map((applicant) => {
            const interview = interviews.find(int => int.applicantId._id === applicant._id);
            const status = interview?.status || "Pending";
            
            return (
              <div key={applicant._id} className="col-lg-6">
                <Card className="h-100 shadow-sm applicant-card">
                  <Card.Header className="d-flex justify-content-between align-items-center bg-white">
                    <div>
                    <h6 className="mt-4"><FaUserTie className="me-2 text-primary" /> Interviewer&apos;s Details</h6>
                      <h5 className="mb-0">{applicant?.interviewersInfo?.name}</h5>
                      <small className="text-muted">{applicant?.interviewersInfo?.email}</small>
                      <small className="text-muted">{applicant?.conductedAt}</small>
                    </div>
                    <Badge pill bg={
                      status === "Shortlisted" ? "success" :
                      status === "Rejected" ? "danger" :
                      status === "Completed" ? "info" :
                      status === "Scheduled" ? "warning" : "secondary"
                    }>
                      {status}
                    </Badge>
                  </Card.Header>
                  
                  <Card.Body>
                    {renderStatusBar(applicant)}
                    
                    <h6 className="mt-4"><FaUserTie className="me-2 text-primary" /> Applicant Details</h6>
                    <ul className="list-unstyled">
                      <li><FaEnvelope className="me-2" /> {applicant?.jobSeekerInfo?.email}</li>
                      <li><FaPhone className="me-2" /> {applicant?.jobSeekerInfo?.phone}</li>
                      <li><FaMapMarkerAlt className="me-2" /> {applicant?.jobSeekerInfo?.address}</li>
                    </ul>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ApplicantTracking;


