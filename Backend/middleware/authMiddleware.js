const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const protect = asyncHandler (async (req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token) {
            res.status(401)
            throw new Error('Not authorized, please login n');
        }

        // verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(verified.id).select("-password");
        if(!user) {
            res.status(401);
            throw new Error('Not authorized, user not found');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401);
            throw new Error('Not authorized, please login now');
    }
});

module.exports = {
    protect
};


// import { Request, Response, NextFunction } from 'express';
// import jwt, {JwtPayload} from 'jsonwebtoken';
// import asyncHandler from 'express-async-handler';
// // import {fetchUsersData} from '../utils/utils';
// // import dotenv from 'dotenv';
// // import { findAllData, User } from '../models/models';
// import User from '../models/userModel';



//  const protect = asyncHandler(async (req, res, next) => {
//     let token = req.cookies.token;
//     if (token) {
//         try {
//             // token = req.cookies.token;
//             if (process.env.JWT_SECRET) {
//                 const decoded = jwt.verify(token, process.env.JWT_SECRET);
                
//                 // const allData = await findAllData()
                
//                 if (typeof(decoded) !== 'string') {
//                     req.user = User.find({id: decoded.id});
//                 }
//                 next();
//             }
//         }
//         catch (error) {
//             console.error(error);
//             res.status(404);
//             throw new Error('Not authorized, token failed');
//         }
//     }
//     else if (( (req.headers.authorization !== undefined) && (req.headers.authorization.startsWith('Bearer')))) {
//         try{
//             token = req.headers.authorization.split('Bearer ')[1];
//             if(process.env.JWT_SECRET){
//                 token = req.cookies.token;
//                 if (process.env.JWT_SECRET) {
//                     const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    
//                     // const allData = await findAllData()
                    
//                     if (typeof(decoded) !== 'string') {
//                         req.user = User.find({id: decoded.id});
//                     }
//                     next();
//                 }
//             }
//         } catch (error) {
//             res.status(404);
//             throw new Error('Not authorized, token failed');
//         }
//     }
//     if(!token){
//         res.status(401);
//         res.redirect('/login');
//         // throw new Error('Not authorized, no token');
//     }
// });

    
module.exports = {
    protect
};