// // import  from "react";
// import Hero from "../components/Hero";
// import TopNiches from "../components/TopNiches";
// import HowItWorks from "../components/HowItWorks";

// const Home = () => {
//   return (
//     <>
//       <Hero />
//       <TopNiches />
//       <HowItWorks />
//     </>
//   );
// };

// export default Home;



// const slidesData = [
//   {
//     type: "job-seeker",
//     title: "🚀 500+ New Remote Jobs Added!",
//     content: "Tech giants are hiring globally - Apply today for positions with competitive salaries and benefits",
//     cta: "Explore Jobs",
//     bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50",
//     badgeColor: "bg-blue-600",
//     icon: <FaLaptopHouse className="text-3xl text-blue-600" />,
//     stats: "📈 30% higher salaries than office roles"
//   },
//   {
//     type: "recruiter",
//     title: "🔥 Limited-Time Offer: 50% Off!",
//     content: "Post your first 3 jobs at half price and reach 100,000+ qualified candidates",
//     cta: "Post Job Now",
//     bgColor: "bg-gradient-to-r from-green-50 to-teal-50",
//     badgeColor: "bg-green-600",
//     icon: <FaBriefcase className="text-3xl text-green-600" />,
//     stats: "⏳ Offer ends in 3 days"
//   },
//   {
//     type: "interviewer",
//     title: "🎯 Become a Certified Interviewer",
//     content: "Earn $50 per interview while helping companies find top talent",
//     cta: "Join Program",
//     bgColor: "bg-gradient-to-r from-purple-50 to-violet-50",
//     badgeColor: "bg-purple-600",
//     icon: <FaChalkboardTeacher className="text-3xl text-purple-600" />,
//     stats: "💼 200+ companies seeking interviewers"
//   },
//   {
//     type: "job-seeker",
//     title: "💎 Exclusive Career Accelerator",
//     content: "Get matched with mentors at FAANG companies - Limited spots available!",
//     cta: "Apply Now",
//     bgColor: "bg-gradient-to-r from-amber-50 to-yellow-50",
//     badgeColor: "bg-amber-600",
//     icon: <FaChartLine className="text-3xl text-amber-600" />,
//     stats: "🌟 92% placement rate for participants"
//   },
//   {
//     type: "recruiter",
//     title: "🔍 AI-Powered Candidate Matching",
//     content: "Our new algorithm finds perfect matches 3x faster than traditional methods",
//     cta: "Try Free Demo",
//     bgColor: "bg-gradient-to-r from-cyan-50 to-sky-50",
//     badgeColor: "bg-cyan-600",
//     icon: <FaSearch className="text-3xl text-cyan-600" />,
//     stats: "⚡ 78% faster hiring process"
//   }
// ];
// import React from "react";
// import React from "react";


// const slidesData = [
//   {
//     type: "job-seeker",
//     title: "🚀 500+ New Remote Jobs Added!",
//     content: "Tech giants are hiring globally - Apply today for positions with competitive salaries and benefits",
//     cta: "Explore Jobs",
//     bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50",
//     badgeColor: "bg-blue-600",
//     icon: <FaLaptopHouse className="text-3xl text-blue-600" />,
//     stats: "📈 30% higher salaries than office roles"
//   },
//   {
//     type: "recruiter",
//     title: "🔥 Limited-Time Offer: 50% Off!",
//     content: "Post your first 3 jobs at half price and reach 100,000+ qualified candidates",
//     cta: "Post Job Now",
//     bgColor: "bg-gradient-to-r from-green-50 to-teal-50",
//     badgeColor: "bg-green-600",
//     icon: <FaBriefcase className="text-3xl text-green-600" />,
//     stats: "⏳ Offer ends in 3 days"
//   },
//   {
//     type: "interviewer",
//     title: "🎯 Become a Certified Interviewer",
//     content: "Earn $50 per interview while helping companies find top talent",
//     cta: "Join Program",
//     bgColor: "bg-gradient-to-r from-purple-50 to-violet-50",
//     badgeColor: "bg-purple-600",
//     icon: <FaChalkboardTeacher className="text-3xl text-purple-600" />,
//     stats: "💼 200+ companies seeking interviewers"
//   },
//   {
//     type: "job-seeker",
//     title: "💎 Exclusive Career Accelerator",
//     content: "Get matched with mentors at FAANG companies - Limited spots available!",
//     cta: "Apply Now",
//     bgColor: "bg-gradient-to-r from-amber-50 to-yellow-50",
//     badgeColor: "bg-amber-600",
//     icon: <FaChartLine className="text-3xl text-amber-600" />,
//     stats: "🌟 92% placement rate for participants"
//   },
//   {
//     type: "recruiter",
//     title: "🔍 AI-Powered Candidate Matching",
//     content: "Our new algorithm finds perfect matches 3x faster than traditional methods",
//     cta: "Try Free Demo",
//     bgColor: "bg-gradient-to-r from-cyan-50 to-sky-50",
//     badgeColor: "bg-cyan-600",
//     icon: <FaSearch className="text-3xl text-cyan-600" />,
//     stats: "⚡ 78% faster hiring process"
//   }
// ];
import  { useState, useEffect } from "react";
import Hero from "../components/Hero";
import TopNiches from "../components/TopNiches";
import HowItWorks from "../components/HowItWorks";
import { 
  FaLaptopHouse,
  FaBriefcase,
  FaChalkboardTeacher,
  FaChartLine,
  FaSearch
} from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  const slidesData = [
    {
      type: "job-seeker",
      title: "🚀 500+ New Remote Jobs Added!",
      content: "Tech giants are hiring globally - Apply today for positions with competitive salaries and benefits",
      cta: "Explore Jobs",
      badgeColor: "job-seeker-badge",
      icon: <FaLaptopHouse className="text-3xl" />,
      stats: "📈 30% higher salaries than office roles"
    },
    {
      type: "recruiter",
      title: "🔥 Limited-Time Offer: 50% Off!",
      content: "Post your first 3 jobs at half price and reach 100,000+ qualified candidates",
      cta: "Post Job Now",
      badgeColor: "recruiter-badge",
      icon: <FaBriefcase className="text-3xl" />,
      stats: "⏳ Offer ends in 3 days"
    },
    {
      type: "interviewer",
      title: "🎯 Become a Certified Interviewer",
      content: "Earn $50 per interview while helping companies find top talent",
      cta: "Join Program",
      badgeColor: "interviewer-badge",
      icon: <FaChalkboardTeacher className="text-3xl" />,
      stats: "💼 200+ companies seeking interviewers"
    },
    {
      type: "job-seeker",
      title: "💎 Exclusive Career Accelerator",
      content: "Get matched with mentors at FAANG companies - Limited spots available!",
      cta: "Apply Now",
      badgeColor: "job-seeker-badge",
      icon: <FaChartLine className="text-3xl" />,
      stats: "🌟 92% placement rate for participants"
    },
    {
      type: "recruiter",
      title: "🔍 AI-Powered Candidate Matching",
      content: "Our new algorithm finds perfect matches 3x faster than traditional methods",
      cta: "Try Free Demo",
      badgeColor: "recruiter-badge",
      icon: <FaSearch className="text-3xl" />,
      stats: "⚡ 78% faster hiring process"
    }
  ];

  // Function to handle slide navigation
  const showSlide = (index) => {
    setCurrentSlide(index);
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 10000); // Resume auto-slide after 10 seconds
  };

  // Auto-slide effect
  useEffect(() => {
    if (!autoSlide) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoSlide, slidesData.length]);

  return (
    <>
      <Hero />
      
      {/* CSS Slideshow Section */}
      <div className="slideshow-container">
        <h2 className="slideshow-title">Hot Opportunities</h2>
        
        <div className="slideshow">
          {slidesData.map((slide, index) => (
            <div 
              key={index} 
              className={`slide ${index === currentSlide ? "active" : ""}`}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              <div className="slide-content">
                <div className="slide-icon-container">
                  {slide.icon}
                </div>
                <div className="slide-text">
                  <span className={`slide-badge ${slide.badgeColor}`}>
                    {slide.type.toUpperCase()}
                  </span>
                  <h3>{slide.title}</h3>
                  <p>{slide.content}</p>
                  <p className="slide-stats">{slide.stats}</p>
                </div>
              </div>
              <button className="slide-button">
                {slide.cta} →
              </button>
            </div>
          ))}
        </div>
        
        <div className="slideshow-dots">
          {slidesData.map((_, index) => (
            <span 
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => showSlide(index)}
            ></span>
          ))}
        </div>
      </div>

      <TopNiches />
      <HowItWorks />
    </>
  );
};

export default Home;