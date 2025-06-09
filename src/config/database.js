const mongoose = require("mongoose")

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://varun:varun@syrus.8obixzz.mongodb.net/Database")
    }
    catch(e){
        console.log(e);
    }
}

module.exports = {connectDB}