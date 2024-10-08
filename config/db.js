const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery',false);
        const conn = await mongoose.connect(process.env.MONGODB_CONN);
        console.log(`Database connected successfuly ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;