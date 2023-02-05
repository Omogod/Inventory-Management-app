const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })};


    /* ==== REGISTER === */
const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body;

    //Validation
    if(!name || !email || !password) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }

    if(password.length < 6) {
        res.status(400);
        throw new Error('Password must be at least 6 characters long');
    }

//check if user already exists

  const userExist =  await User.findOne({email})
  if(userExist) {
      res.status(400);
      throw new Error('User already exists');
  }

  
  // create user
  const user = await User.create({
      name,
      email,
      password
    });
    
    // generate token
    const token = generateToken(user._id);

    // send http only cookie

    res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //1day
        sameSite: "none",
        secure: true
    });

    if(user) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(201).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            token
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

});

    /* ==== LOGIN === */
const loginUser = asyncHandler( async (req, res) => {
    
    const { email, password } = req.body;

    //Validation
    if(!email || !password) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }

    // check if user exists

    const user = await User.findOne({email});

    if(!user){
        res.status(400);
        throw new Error('user not found, please signup');
    }

    // check if password matches
    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if(user && passwordIsMatch) {
        // generate token
        const token = generateToken(user.id);

        res.cookie('token', token);
        if (token){
            res.cookie('user', user)
          }
          res.cookie('user', user)
        const { _id, name, email, photo, phone, bio } = user;
        return res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            token
        });
    } else {
        res.status(400);
    throw new Error('Invalid email or password');
    }  

    // generate token
});

//logout user
const logout = asyncHandler( async (req, res) => {
    res.cookie('token', "", {
        path: '/',
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true
    });
    res.status(200).json({
        message: 'Succesfully Logged Out'
    });
})

//get user data
const getUser = asyncHandler( async (req, res) => {

    const user = await User.findById(req.user._id);

    if(user) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});



module.exports = {
    registerUser, loginUser, logout, getUser
};