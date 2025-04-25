// import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PostApplication from "./pages/PostApplication";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useDispatch } from "react-redux";
// import { getUser } from "./store/slices/userSlice";
import InterviewerDashboard from "./components/InterviewerDashboard";
import ApplicantsListPage from "./pages/ApplicantsListPage";
import InterviewerPaymentDashboard from "./components/InterviewerPaymentDashboard";
// import 'bootstrap/dist/css/bootstrap.min.css';
import ApplicantTracking from "./components/ApplicantTracking";
import AboutPage from "./components/AboutPage";

// In your routes

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUser());
  // }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interviewer-dashboard" element={<InterviewerDashboard />} />
          <Route path="/interviewer-payment-dashboard" element={<InterviewerPaymentDashboard />} /> {/* Add the route */}
          <Route path="/job/:jobId/applicants" element={<ApplicantsListPage />} />
<Route path="/job/:jobId/tracking" element={<ApplicantTracking />} />
          <Route
            path="/post/application/:jobId"
            element={<PostApplication />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/AboutPage" element={<AboutPage/>} />
          {/* Add other routes here */}
          
        </Routes>
        <Footer />
        <ToastContainer position="top-right" theme="dark" />
      </Router>
    </>
  );
};

export default App;
