/*
importing express framework
 */
const express = require('express')
const app = express()

/*
importing dotenv module
 */
const dotenv = require('dotenv').config()

/*
@desc Port mapping through .env port field
 */
const port = process.env.PORT || 5000
/*
@ Desc db connection
 */
const dbConnect = require('./config/dbConnect')
// const dbConnectUser = require('./config/dbConnectUser')

/*
@desc middleware parser to JSON
 */
app.use(express.json())
/*
@desc Error handler
 */
const errorHandler = require('./middleware/errorHandler')

/*
@desc Route middleware point
 */
dbConnect()
// dbConnectUser()
app.use(errorHandler)
app.use('/api/contacts', require('./routes/contactRoutes') )
app.use('/api/users', require('./routes/userRoutes') )
/*
@desc Auto refreshing the page content
 */
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
    // console.log(`testing server nodemon`)
});