import { useState, useEffect } from "react";
import { fetchProblems } from "../../services/fetchProblems";
import { useNavigate } from "react-router-dom";

const Problems = () => {
  const [problems, setProblem] = useState([]);

    const navigate = useNavigate();

  useEffect(() => {
    const problemFetch = async () => {
      try {
        const problems = await fetchProblems();
        setProblem(problems);
      } catch (err) {
        throw new Error(err);
      }
    };
    problemFetch();
  }, []);

  const navigateProblem = (problem) => {
    navigate(`/problems/${problem._id}`, { state: problem });
  }

  return (
    <>
      {problems.map((problem) => (
        <div key={problem._id} className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" onClick = {()=> navigateProblem(problem)}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {" "}
            {problem.title}{" "}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{problem.statement}</p>
        </div>
      ))}
    </>
  );
};

export default Problems;
