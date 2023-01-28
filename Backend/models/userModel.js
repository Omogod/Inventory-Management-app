const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        trim: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
        'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, "please add a password"],
        minlength: [6, "password must be at least 6 characters long"],
        maxlength: [23, "password must be at less than 24 characters long"],
    },

    photo: {
        type: String,
        required: [true, "please add a photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png"
    },

    phone: {
        type: String,
        default: "+234"
    },

    bio: {
        type: String,
        maxLength: [250, "Bio must be at less than 251 characters long"],
        default: "bio"
    },
    
}, {
    timestamps: true
});

const User = mongoose.model('user', userSchema);

module.exports = User