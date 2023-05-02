const express = require('express')
/*
Accessing the routes' module/function
 */
const router = express.Router();

/*
@desc original routing syntax
 */

/*
router.route(('/').[get,put,post,delete]((req, res) => {
    res.status(200).json({message: 'Connection successful'})
}))
 */

/*
@desc init routes from controller folder
 */

const {regUser, loginUser, currentUser} = require('../controller/userController')

router.route('/register' ).post(regUser)
router.route('/login').post(loginUser)
router.route('/current').get(currentUser)

module.exports = router