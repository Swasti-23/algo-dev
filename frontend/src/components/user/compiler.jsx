import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../stylesheets/compiler.css';


const Compiler = () => {
    const location = useLocation();
    const problem = location.state;
    const [language, setLanguage] = useState("cpp");
    const [Verdict, setVerdict] = useState("");
    const COMPILE_PATH = import.meta.env.VITE_COMPILER_PATH;
    const [code, setCode] = useState(`#include <iostream> 
    using namespace std;
    // Define the main function
    int main() { 
        // Declare variables
        int num1, num2, sum;
        // Prompt user for input
        cin >> num1 >> num2;  
        // Calculate the sum
        sum = num1 + num2;  
        // Output the result
        cout << "The sum of the two numbers is: " << sum;  
        // Return 0 to indicate successful execution
        return 0;  
    }`);
    const handleCodeChange = (e) => {
      setCode(e.target.value);
    };
  
    const handleLanguageChange = (e) => {
      setLanguage(e.target.value);
    };
  
    const formatInput = (input) => {
      return input
        // eslint-disable-next-line no-useless-escape
        .replace(/[\[\]"]/g, "")
        .split(",")
        .map((num) => num.trim())
        .join(" ");
    };

    const handleSubmit = async(e) => {
      
      e.preventDefault();
      setVerdict("Running");
      let Verdict = true;
      for(let testcase of problem.testcases) {
        const formattedInput = testcase.inputs.map(({ input }) => formatInput(input)).join(" ");
        console.log(formattedInput);
        try {
          const response = await axios.post(COMPILE_PATH, { language: language, code: code, input: formattedInput });
          if(response.status !== 200) {
            setVerdict("Error");
            Verdict = false;
            break;
          }
          const userOutput = response.data.output;
          const expectedOutput = formatInput(testcase.output);

          const processOutput = (output) => {
            if (Array.isArray(output)) {
              const temp =  JSON.stringify(output).toLowerCase().trim();
              return formatInput(temp);
            } else if (typeof output === "object") {
              return JSON.stringify(output).toLowerCase().trim();
            } else if (typeof output === "string") {
              return output.toLowerCase().trim();
            } else if (typeof output === "number") {
              return output.toString().toLowerCase().trim();
            }
            return ""; 
          };

          const processedUserOutput = processOutput(userOutput);
          const processedExpectedOutput = processOutput(expectedOutput);

          console.log(processedUserOutput);
          console.log(processedExpectedOutput);
    
          if (processedUserOutput !== processedExpectedOutput) {
            setVerdict("Wrong Answer");
            Verdict = true;
            break;
          }

        } catch (err) {
          console.log(err);
          Verdict = false;
          setVerdict("Error");
        }
      }
      if (Verdict) {
        setVerdict("Accepted");
      }
    };
  return (
    <div className="container">
        <h1>Compiler</h1>
        <label id="language" htmlFor="language" className="codeLabel">
            Select Language
          </label>
          <select id="language" name="language" onChange={handleLanguageChange}>
            <option value="cpp">C++</option>
            <option value="py">Python</option>
            <option value="java">Java</option>
          </select>
        <textarea className="codearea"
          id="code"
          name="code"
          onChange={handleCodeChange}
        ></textarea>
        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" type="submit" onClick={handleSubmit}>Submit</button>
        <div className="verdict">{Verdict}</div>
    </div>
  );
};

export default Compiler;
