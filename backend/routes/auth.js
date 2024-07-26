const express = require('express');

const User = require('../models/Users.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

//cookie parser
const cookieParser = require('cookie-parser');
router.use(cookieParser());



//middleware
router.use(express.json());
router.use(express.urlencoded({extended:true}));




router.get("/", (req, res) => {
    res.send("Welcome to the today's class"); 
});

router.post("/register", async (req, res) => {
    try{
        //get all the data from request body
        const {fullname, email, password} = req.body;

        //check all data should exist
        if(!(fullname && email && password)){
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
            fullname,
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
        res.status(500).send("Internal Server Error");
    }
});

router.post("/login", async (req, res) => {
    try{
        //get all the data from request body
        const {email, password} = req.body;

        //check all the details should exist
        if(!(email && password)){
            return res.status(400).send("Please enter all the required fields!");
        }

        //find the user in the database
        const existingUser = await User.findOne({email: email});
        if(!existingUser){
            return res.status(400).send("The email is not registered");
        }

        //match the password
        const passwordMatch = bcrypt.compareSync(password, existingUser.password);
        if(!passwordMatch){
            return res.status(400).send("Email & password don't match");
        }
        
        //create token
        const token = jwt.sign({id:existingUser._id, email}, process.env.SECRET_KEY, {
            expiresIn: "1h"
        });
        existingUser.token = token;
        

        //store cookies
        res.cookie("token", token, {
            httpOnly: true, // Makes the cookie inaccessible to JavaScript
            secure: true, // Ensures the cookie is sent only over HTTPS
            maxAge: 3600000 // 1 hour in milliseconds
        });
        
        //send the token
        existingUser.password = undefined;
        res.status(201).json({
            temp: "You have succesfully logged-in!",
            success : true,
            token,
            user : existingUser
        });

    }catch(error){
        console.log("Error while registering", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;