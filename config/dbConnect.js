const mongoose = require('mongoose')

const dbConnect = async () => {
    try {
        const urlConnect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`DB connected: ${urlConnect.connection.name}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}
module.exports =dbConnect