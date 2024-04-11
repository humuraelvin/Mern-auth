const mongoose = require('mongoose');

module.exports = () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected To MongoDb Successfully`);
    } catch (error) {
        console.log("Connection Failed", error.message);
    }
}
