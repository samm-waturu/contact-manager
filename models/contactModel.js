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

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add the contact name']
    },
    email: {
        type: String,
        required: [true, 'Please add the email address']
    },
    phone: {
        type: String,
        required: [true, 'Please add the phone number']
    },
},
    {
        timestamps: true
    });

/*
exporting schema
 */

module.exports = mongoose.model('Contact', contactSchema)