// Responsible for establishing and managing the MongoDB connection using Mongoose.

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${connection.connection.host}`);

    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        throw error;
    }
};

module.exports = connectDB;
