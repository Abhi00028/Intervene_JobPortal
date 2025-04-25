import  { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const InterviewPage = ({ interviewLink }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // You can fetch interview details from your API if needed
        setLoading(false);
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Interview with Candidate</h1>
            <p>Please click the link below to join the interview:</p>
            <a href={interviewLink} target="_blank" rel="noopener noreferrer">
                Join Interview
            </a>
        </div>
    );
};

// Add propTypes for validation
InterviewPage.propTypes = {
    interviewLink: PropTypes.string.isRequired, // Ensure 'interviewLink' is a string and is required
};

export default InterviewPage;
