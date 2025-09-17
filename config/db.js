//Imported packages
const mongoose = require('mongoose');


//Function to establish connection to database MONGODB
const connectDB = async () => {
    try {
        //Connection to the database through env variable
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb connected");
    }
    catch (error) {

        //If the connection fails, log the error and stop the server
        console.error("Database Connection Failed", error.message);
        process.exit(1);
    }
}

//Exported the function to be reused
module.exports = connectDB;
