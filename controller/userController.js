/*
@desc Route requests and responses

 */

/*

@desc:AsyncHandler conducts try catch blocks on all our async routes or
       functions connecting to the DB. This is because DB always return a
        promise
 */

const asyncHandler = require('express-async-handler')

/*
@ Desc bcrypt password hash
 */

const passCrypt = require('bcrypt')
/*
@ Desc jwt init for logging in and accessing private routes
 */

const jwt = require('jsonwebtoken')

/*
importing CRUD connect from contactModel
 */
const userMod = require('../models/userModel')

/*
@desc Get all contacts
@route GET /api/contacts
@access public/private
 */

const regUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory')
    }
    const userEmailAvail = await userMod.findOne({email})

    if (userEmailAvail) {
        res.status(400);
        throw new Error('Email already registered')
    }
    /*
    @ Desc pass hashing
     */
    const hashPass = await passCrypt.hash(password, 10)
    /*
    @ Desc pass hashing terminating
     */
    const regNew = await userMod.create({
        username,
        email,
        password: hashPass
    })
    {
        console.log(`${regNew}`)
        if (regNew)
            res.json({_id: regNew.id, email: regNew.email, username: regNew.username, message: 'You have successfully added a new user'})

    }
    res.status(400);
    throw new Error('User data is invalid')
});

const loginUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body;

    if (!email || !password) {
        res.status(400)
        throw new Error('All fields are mandatory')
    }

    const userEmailAvail = await userMod.findOne({email});

    if (userEmailAvail && (await passCrypt.compare(password, userEmailAvail.password))) {
        const accessToken = jwt.sign({
               user: {
                    username: userMod.username,
                    email: userMod.email,
                    id: userMod.id
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '1m'}
        );
        res.status(200).json({accessToken})
    } else {
        res.status(401)
        throw new Error(`Email or password is invalid`)
    }


});

const currentUser = asyncHandler(async (req, res) => {
    res.json({message: 'Current user information'})
})

module.exports = {regUser, loginUser, currentUser}