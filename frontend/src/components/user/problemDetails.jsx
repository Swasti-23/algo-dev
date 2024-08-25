import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../stylesheets/problemDetails.css";
import { useNavigate } from "react-router-dom";

const problemDetails = () => {
  const location = useLocation();
  const [problem, setProblem] = useState(location.state || null);
  const navigate = useNavigate();
  const { state } = location;
  const problemId = state?._id || "";

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PROBLEMS_PATH}/${problemId}`
        );
        setProblem(response.data);
      } catch (err) {
        console.error("Error fetching problem details:", err);
      }
    };

    if (!problem && problemId) {
      fetchProblem();
    }
  }, [problem, problemId]);

  if (!problem) return <div>Loading...</div>;

  const handleSubmit = ()=> {
    navigate(`/problems/${problem._id}/run`, {state : problem});
  }

  return (
    <div className="problem-details-container">
      <h1 className="title">{problem.title}</h1>
      <p className="text">{problem.statement}</p>
      <h2 className="headingtext">Input Description</h2>
      <ul>
        {problem.inputDescription.map((desc, index) => (
          <li className="text" key={index}>
            {desc.description}
          </li>
        ))}
      </ul>
      <h2 className="headingtext">Output Description</h2>
      <ul>
        {problem.outputDescription.map((desc, index) => (
          <li className="text" key={index}>
            {desc.description}
          </li>
        ))}
      </ul>
      <h2 className="headingtext">Constraints</h2>
      <ul>
        {problem.constraints.map((constraint, index) => (
          <li className="text" key={index}>
            {constraint.constraint}
          </li>
        ))}
      </ul>
      {problem.testcases.map((testcase, index) => (
        <div key={index}>
          <h3 className="headingtext">Test Case {index + 1}</h3>
          <h4 className="headingtext outerbox">Input</h4>
          <ul className="box">

            {testcase.inputs.map((input, idx) => (
              <li key={idx}>
                {input.input}
              </li>
            ))}
          </ul>
          <h4 className="headingtext outerbox">Output</h4>
          <ul className="box">
         
            <li>{testcase.output}</li>
          </ul>
          {testcase.explanation && (
            <>
              <h4 className="headingtext">Explanation:</h4>
              <p className="text">{testcase.explanation}</p>
            </>
          )}
        </div>
      ))}
      <div>
        <button type="submit" className="submit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default problemDetails;
