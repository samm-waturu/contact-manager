
/*
@ Desc mongoose is a node object data modelling library
 */

/*
@ Desc importing the DB
 */
const mongoose = require('mongoose')

/*
@ Desc init schema
 */

const userSchema = mongoose.Schema({
        username: {
            type: String,
            required: [true, 'Please fill your username']
        },
        email: {
            type: String,
            required: [true, 'Please fill your email address'],
            unique: [true, 'Email address already taken']
        },
        password: {
            type: String,
            required: [true, 'Please fill your password']
        },
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('User', userSchema)