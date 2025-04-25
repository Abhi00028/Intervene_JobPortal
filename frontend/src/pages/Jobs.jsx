


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
