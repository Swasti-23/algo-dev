const express = require('express');
const Problem = require('../models/Problems.js');

const router = express.Router();

router.post('/newProblem', async(req, res) => {
    try{
        const problem = await Problem.findOne({title: req.body.title});
        if(problem){
            return res.status(400).send("Sorry! the title already exists.");
        }
        const newProblem = await Problem.create({
            title: req.body.title,
            statement: req.body.statement,
            inputDescription: req.body.inputDescription,
            outputDescription: req.body.outputDescription,
            testcases: req.body.testcases,
            constraints: req.body.constraints,
            createdBy: req.body.createdBy
        })
        res.status(200).send("Problem succesfully created!");

    }catch(err){
        console.log(err.message);
        res.status(400).send("Error in creating problem!");
    }
});

router.get('/getProblem', async(req,res) => {
    try{
        const problems = await Problem.find();
        res.status(200).send(problems);
    }catch(err){
        console.log(err.message);
        res.status(400).send("Error in fetching problems!");
    }
})



module.exports = router;