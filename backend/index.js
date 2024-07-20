const express = require('express');
const app = express();
const {DBConnection} = require('./database/db.js');
const User = require('./models/Users.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));


DBConnection();

app.get("/", (req, res) => {
    res.send("Welcome to the today's class"); 
});

app.post("/register", async (req, res) => {
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
        const hashPassword = bcrypt.hashSync(password, 10);
        console.log(hashPassword);

        //save the user to the database
        const user = await User.create({
            firstname,
            lastname,
            email,
            password : hashPassword,
        });

        //generate a token for user and send it
        const token = jwt.sign({id:user._id, email}, process.env.SECRET_KEY, {
            expiresIn: "1h"
        });
        user.token = token;
        user.password = undefined;
        res.status(201).json({
            temp: "You have succesfully registered!",
            success : true,
            token,
            user
        });
    }catch(error){
        console.log("Error while registering", error);
    }
});

app.post("/login", async (req, res) => {
    try{
        //get all the data from request body
        const {email, password} = req.body;

        //check all the details should exist
        if(!(email && password)){
            return res.status(400).send("Please enter all the required fields!");
        }

        //find the user in the database
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).send("The email is not registered");
        }

        //match the password
        const passwordMatch = bcrypt.compareSync(password, existingUser.password);
        if(!passwordMatch){
            return res.status(400).send("Email & password don't match");
        }
        
        //create token
        //store cookies
        //send the token
    }catch(error){

    }
});

app.listen(8000, () => {
    console.log("Server is listening at port 8000");
});