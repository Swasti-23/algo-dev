const express = require('express');
const app = express();
const {DBConnection} = require('./database/db.js');
const User = require('./models/users.js');

DBConnection();

app.get("/", (req, res) => {
    res.send("Welcome to the today's class"); 
});

app.post("/register", async (req, res) => {
    console.log(req);
    try{
        //get all the data from request body
        const {firstname, lastname, email, password} = req.body;

        //check all data should exist
        if(!(firstname && lastname && email && password)){
            return res.status(400).send("Please enter all the required fields!");
        }

        //check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).send("User already exists!");
        }

        //encrypt the password
        //save the user to the database
        //generate a token for user and send it
    }catch(error){
        console.log("Error while registering", error);
    }
});

app.listen(8000, () => {
    console.log("Server is listening at port 8000");
});