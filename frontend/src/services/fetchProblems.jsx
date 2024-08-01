import axios from "axios";

export const fetchProblems = async() =>{
    try{
        const problem = await axios.get(import.meta.env.VITE_PROBLEMS_PATH);
        return problem.data;
    }catch(err){
        throw new Error(err);
    }
}
