const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");



//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req,resp) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        resp.status(400);
        throw new Error("All fields are mandatory!");
    }
    
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        resp.status(400);
        throw new Error("User already exists!");
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    if(user){
        resp.status(200).json({_id: user.id, email: user.email});
    }
    else{
        resp.status(400);
        throw new Error("User data is not valid");
    }

    resp.status(200).json({message: "User created"});
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,resp) => {
    const {email,password} = req.body;
    if(!email || !password){
        resp.status(400);
        throw new Error("All fields are required!");
    }
    const user = await User.findOne({email});
    if(!user){
        resp.status(404);
        throw new Error("User not exists, Please register")
    }
    else{
        if(user && await bcrypt.compare(password, user.password)){
            const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                },
            },process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "15m"}
            );

            resp.status(200).json({accessToken});
        }
        else{
            resp.status(401);
            throw new Error("Wrong Password!");
        }
    }
    // resp.status(200).json({message: "Logged in Successfully"})
});

//@desc Current user info
//@route POST /api/users/current
//@access public
const currentUser = asyncHandler(async (req,resp) => {
    resp.status(200).json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
}