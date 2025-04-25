// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
// import Spinner from "../components/Spinner";
// import { FaSearch } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import cities from "../data/canadianCities.json";


// const Jobs = () => {
//   const [city, setCity] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [niche, setNiche] = useState("");
//   const [selectedNiche, setSelectedNiche] = useState("");
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const { user } = useSelector((state) => state.user);  // Assuming `auth` slice stores user data

//   const { jobs, loading, error } = useSelector((state) => state.jobs);

//   const handleCityChange = (city) => {
//     setCity(city);
//     setSelectedCity(city);
//   };
//   const handleNicheChange = (niche) => {
//     setNiche(niche);
//     setSelectedNiche(niche);
//   };

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearAllJobErrors());
//     }
//     dispatch(fetchJobs(city, niche, searchKeyword));
//   }, [dispatch, error, city, niche]);

//   const handleSearch = () => {
//     dispatch(fetchJobs(city, niche, searchKeyword));
//   };

  
//   const nichesArray = [
//     "All",
//     "Software Development",
//     "Web Development",
//     "Cybersecurity",
//     "Data Science",
//     "Artificial Intelligence",
//     "Cloud Computing",
//     "DevOps",
//     "Mobile App Development",
//     "Blockchain",
//     "Database Administration",
//     "Network Administration",
//     "UI/UX Design",
//     "Game Development",
//     "IoT (Internet of Things)",
//     "Big Data",
//     "Machine Learning",
//     "IT Project Management",
//     "IT Support and Helpdesk",
//     "Systems Administration",
//     "IT Consulting",
//   ];

//   return (
//     <>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <section className="jobs">
//           <div className="search-tab-wrapper">
//             <input
//               type="text"
//               value={searchKeyword}
//               onChange={(e) => setSearchKeyword(e.target.value)}
//             />
//             <button onClick={handleSearch}>Find Job</button>
//             <FaSearch />
//           </div>
//           <div className="wrapper">
//             <div className="filter-bar">
//               <div className="cities">
//                 <h2>Filter Job By City</h2>
//                 {cities.map((city) => (
//   <div key={city}>
//     <input
//       type="radio"
//       id={city}
//       name="city"
//       value={city}
//       checked={selectedCity === city}
//       onChange={() => handleCityChange(city)}
//     />
//     <label htmlFor={city}>{city}</label>
//   </div>
// ))}
//               </div>
//               <div className="cities">
//                 <h2>Filter Job By Niche</h2>
//                 {nichesArray.map((niche) => (
//                   <div key={niche}>
//                     <input
//                       type="radio"
//                       id={niche}
//                       name="niche"
//                       value={niche}
//                       checked={selectedNiche === niche}
//                       onChange={() => handleNicheChange(niche)}
//                     />
//                     <label htmlFor={niche}>{niche}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="container">
//               <div className="mobile-filter">
//                 <select value={city} onChange={(e) => setCity(e.target.value)}>
//                   <option value="">Filter By City</option>
//                   {cities.map((city, index) => (
//                     <option value={city} key={index}>
//                       {city}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   value={niche}
//                   onChange={(e) => setNiche(e.target.value)}
//                 >
//                   <option value="">Filter By Niche</option>
//                   {nichesArray.map((niche, index) => (
//                     <option value={niche} key={index}>
//                       {niche}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="jobs_container">
//                 {jobs && jobs.length > 0 ? (jobs.map((element) => {
//                     return (
//                       <div className="card" key={element._id}>
//                         {element.hiringMultipleCandidates === "Yes" ? (
//                           <p className="hiring-multiple">
//                             Hiring Multiple Candidates
//                           </p>
//                         ) : (
//                           <p className="hiring">Hiring</p>
//                         )}
//                         <p className="title">{element.title}</p>
//                         <p className="company">{element.companyName}</p>
//                         <p className="location">{element.location}</p>
//                         <p className="salary">
//                           <span>Salary:</span> Rs. {element.salary}
//                         </p>
//                         <p className="posted">
//                           <span>Posted On:</span>{" "}
//                           {element.jobPostedOn.substring(0, 10)}
//                         </p>
//                         <div className="btn-wrapper">
//                           {/* Conditionally render buttons based on user role */}
//                       {user && user.role === "Interviewer" ? (
//                         <Link
//                           className="btn"
//                           to={`/job/${element._id}/applicants`}
//                         >
//                           View Applicants
//                         </Link>
//                       ) : (
//                         <Link
//                           className="btn"
//                           to={`/post/application/${element._id}`}
//                         >
//                           Apply Now
//                         </Link>
//                       )}
                    
//                         </div>
//                       </div>
//                     );
//                   })) : (
//                   /************************************************************/
//                   /* BUG No.2 */
//                   <img src="./notfound.png" alt="job-not-found" style={{width: "100%"}}/>)
//                   /************************************************************/




//                   }
//               </div>
//             </div>
//           </div>
//         </section>
//       )}
//     </>
//   );
// };

// export default Jobs;



// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
// import Spinner from "../components/Spinner";
// import { FaSearch } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import cities from "../data/canadianCities.json";
// import notFoundImage from "../../assets/notfound.png"; // Make sure this path is correct

// const Jobs = () => {
//   const [city, setCity] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [niche, setNiche] = useState("");
//   const [selectedNiche, setSelectedNiche] = useState("");
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState(searchKeyword);
//   const { user } = useSelector((state) => state.user);

//   const { jobs, loading, error } = useSelector((state) => state.jobs);

//   const dispatch = useDispatch();

//   // Debounce function
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearchKeyword(searchKeyword);
//     }, 500); // Delay of 500ms

//     return () => clearTimeout(timer); // Clean up the timer on unmount or on searchKeyword change
//   }, [searchKeyword]);


   
//   const nichesArray = [
//     "All",
//     "Software Development",
//     "Web Development",
//     "Cybersecurity",
//     "Data Science",
//     "Artificial Intelligence",
//     "Cloud Computing",
//     "DevOps",
//     "Mobile App Development",
//     "Blockchain",
//     "Database Administration",
//     "Network Administration",
//     "UI/UX Design",
//     "Game Development",
//     "IoT (Internet of Things)",
//     "Big Data",
//     "Machine Learning",
//     "IT Project Management",
//     "IT Support and Helpdesk",
//     "Systems Administration",
//     "IT Consulting",
//   ];
//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearAllJobErrors());
//     }
//     dispatch(fetchJobs(city, niche, debouncedSearchKeyword));
//   }, [dispatch, error, city, niche, debouncedSearchKeyword]);

//   const handleCityChange = (city) => {
//     setCity(city);
//     setSelectedCity(city);
//   };

//   const handleNicheChange = (niche) => {
//     setNiche(niche);
//     setSelectedNiche(niche);
//   };

//   const handleSearch = () => {
//     dispatch(fetchJobs(city, niche, debouncedSearchKeyword));
//   };

//   const renderActionButton = (jobId) => {
//     if (!user) {
//       return (
//         <Link className="btn" to={`/post/application/${jobId}`}>
//           Apply Now
//         </Link>
//       );
//     }

//     switch (user.role) {
//       case "Employer":
//         return (
//           <Link className="btn" to={`/job/${jobId}/tracking`}>
//             Track Applicants
//           </Link>
//         );
//       case "Interviewer":
//         return (
//           <Link className="btn" to={`/job/${jobId}/applicants`}>
//             View Applicants
//           </Link>
//         );
//       default:
//         return (
//           <Link className="btn" to={`/post/application/${jobId}`}>
//             Apply Now
//           </Link>
//         );
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <section className="jobs">
//           <div className="search-tab-wrapper">
//             <input
//               type="text"
//               value={searchKeyword}
//               onChange={(e) => setSearchKeyword(e.target.value)}
//               placeholder="Search by job title, company..."
//               className="search-input"
//             />
//             <button onClick={handleSearch} className="search-button">
//               <FaSearch className="search-icon" />
//               <span>Find Jobs</span>
//             </button>
//           </div>
//           <div className="wrapper">
//             <div className="filter-bar">
//               <div className="filter-section">
//                 <h2>Filter By City</h2>
//                 <div className="filter-options">
//                   {cities.map((city) => (
//                     <div className="filter-option" key={`city-${city}`}>
//                       <input
//                         type="radio"
//                         id={`city-${city}`}
//                         name="city"
//                         value={city}
//                         checked={selectedCity === city}
//                         onChange={() => handleCityChange(city)}
//                         className="filter-radio"
//                       />
//                       <label htmlFor={`city-${city}`} className="filter-label">
//                         {city}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="filter-section">
//                 <h2>Filter By Niche</h2>
//                 <div className="filter-options">
//                   {nichesArray.map((niche) => (
//                     <div className="filter-option" key={`niche-${niche}`}>
//                       <input
//                         type="radio"
//                         id={`niche-${niche}`}
//                         name="niche"
//                         value={niche}
//                         checked={selectedNiche === niche}
//                         onChange={() => handleNicheChange(niche)}
//                         className="filter-radio"
//                       />
//                       <label htmlFor={`niche-${niche}`} className="filter-label">
//                         {niche}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="container">
//               <div className="mobile-filter">
//                 <select
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                   className="mobile-select"
//                 >
//                   <option value="">All Cities</option>
//                   {cities.map((city) => (
//                     <option value={city} key={`mobile-city-${city}`}>
//                       {city}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   value={niche}
//                   onChange={(e) => setNiche(e.target.value)}
//                   className="mobile-select"
//                 >
//                   <option value="">All Niches</option>
//                   {nichesArray.map((niche) => (
//                     <option value={niche} key={`mobile-niche-${niche}`}>
//                       {niche}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="jobs_container">
//                 {jobs && jobs.length > 0 ? (
//                   jobs.map((job) => (
//                     <div className="job-card" key={job._id}>
//                       <div className="job-badge">
//                         {job.hiringMultipleCandidates === "Yes" ? (
//                           <span className="multiple-hiring">Hiring Multiple</span>
//                         ) : (
//                           <span className="hiring">Hiring</span>
//                         )}
//                       </div>
//                       <div className="job-content">
//                         <h3 className="job-title">{job.title}</h3>
//                         <p className="job-company">{job.companyName}</p>
//                         <p className="job-location">
//                           <i className="location-icon"></i>
//                           {job.location}
//                         </p>
//                         <p className="job-salary">
//                           <span>Salary:</span> $ {job.salary}
//                         </p>
//                         <p className="job-posted">
//                           <span>Posted:</span> {job.jobPostedOn.substring(0, 10)}
//                         </p>
//                         <div className="job-actions">
//                           {renderActionButton(job._id)}
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="no-jobs">
//                     <img
//                       src={notFoundImage}
//                       alt="No jobs found"
//                       className="no-jobs-image"
//                     />
//                     <p className="no-jobs-text">
//                       No jobs found matching your criteria
//                     </p>
//                     <button
//                       onClick={() => {
//                         setCity("");
//                         setNiche("");
//                         setSearchKeyword("");
//                       }}
//                       className="reset-filters"
//                     >
//                       Reset Filters
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>
//       )}
//     </>
//   );
// };

// export default Jobs;



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import cities from "../data/canadianCities.json";
import notFoundImage from "../../assets/notfound.png";

const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState(searchKeyword);
  const { user } = useSelector((state) => state.user);

  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const dispatch = useDispatch();

  // Debounce function
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchKeyword(searchKeyword);
    }, 500); // Delay of 500ms

    return () => clearTimeout(timer); // Clean up the timer on unmount or on searchKeyword change
  }, [searchKeyword]);

  const nichesArray = [
    "All",
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs(city, niche, debouncedSearchKeyword));
  }, [dispatch, error, city, niche, debouncedSearchKeyword]);

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
  };

  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
  };

  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, debouncedSearchKeyword));
  };

 


  const renderActionButton = (jobId) => {
    if (!user) {
      return (
        <Link className="btn" to={`/post/application/${jobId}`}>
          Apply Now
        </Link>
      );
    }

    switch (user.role) {
      case "Employer":
        return (
          <Link className="btn" to={`/job/${jobId}/tracking`}>
            Track Applicants
          </Link>
        );
      case "Interviewer":
        return (
          <Link className="btn" to={`/job/${jobId}/applicants`}>
            View Applicants
          </Link>
        );
      default:
        return (
          <Link className="btn" to={`/post/application/${jobId}`}>
            Apply Now
          </Link>
        );
    }
  };

  const resetFilters = () => {
    setCity("");
    setSelectedCity("");
    setNiche("");
    setSelectedNiche("");
    setSearchKeyword("");
    setDebouncedSearchKeyword("");
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs">
          <button onClick={resetFilters} className="btn">
                      Reset Filters
                    </button>
          <div className="search-tab-wrapper">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search by job title, company..."
            />
            <button onClick={handleSearch}>
              <FaSearch />
              Find Job
            </button>
            
          </div>
          
          <div className="wrapper">
            <div className="filter-bar">
              <div className="cities">
                <h2>Filter Job By City</h2>
                {cities.map((city) => (
                  <div key={city}>
                    <input
                      type="radio"
                      id={city}
                      name="city"
                      value={city}
                      checked={selectedCity === city}
                      onChange={() => handleCityChange(city)}
                    />
                    <label htmlFor={city}>{city}</label>
                  </div>
                ))}
              </div>
              <div className="cities">
                <h2>Filter Job By Niche</h2>
                {nichesArray.map((niche) => (
                  <div key={niche}>
                    <input
                      type="radio"
                      id={niche}
                      name="niche"
                      value={niche}
                      checked={selectedNiche === niche}
                      onChange={() => handleNicheChange(niche)}
                    />
                    <label htmlFor={niche}>{niche}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="container">
              <div className="mobile-filter">
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">Filter By City</option>
                  {cities.map((city, index) => (
                    <option value={city} key={index}>
                      {city}
                    </option>
                  ))}
                </select>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                >
                  <option value="">Filter By Niche</option>
                  {nichesArray.map((niche, index) => (
                    <option value={niche} key={index}>
                      {niche}
                    </option>
                  ))}
                </select>
              </div>
              <div className="jobs_container">
                {jobs && jobs.length > 0 ? (
                  jobs.map((element) => {
                    return (
                      <div className="card" key={element._id}>
                        {element.hiringMultipleCandidates === "Yes" ? (
                          <p className="hiring-multiple">
                            Hiring Multiple Candidates
                          </p>
                        ) : (
                          <p className="hiring">Hiring</p>
                        )}
                        <p className="title">{element.title}</p>
                        <p className="company">{element.companyName}</p>
                        <p className="location">{element.location}</p>
                        <p className="salary">
                          <span>Salary:</span> Rs. {element.salary}
                        </p>
                        <p className="posted">
                          <span>Posted On:</span>{" "}
                          {element.jobPostedOn.substring(0, 10)}
                        </p>
                        <div className="btn-wrapper">
                          {renderActionButton(element._id)}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  
                  <div className="no-jobs">
                    <img src={notFoundImage} alt="job-not-found" style={{width: "100%"}}/>
                    <p>No jobs found matching your criteria</p>
                    <button onClick={resetFilters} className="btn">
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;