/*
importing express framework
 */
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

/*
@Desc making routes private
 */


const {getAll, deleteAll, createNew, getId, updateId, deleteId} = require('../controller/contactController')

router.route('/').get(getAll);
router.route('/').delete(deleteAll);
router.route('/').post(createNew);

// Routes with req.params.id

router.route('/:id').get(getId);
router.route('/:id').put(updateId);
router.route('/:id').delete(deleteId);

module.exports = router