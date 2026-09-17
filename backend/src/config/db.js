import mongoose from "mongoose";
const ConnectDB = async()=>{
    try {
         await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connested to MongoDB server`);
        
    } catch (error) {
        console.error("❌ Database Connection Failed");
        console.error("error",error.message)
       
        process.exit(1);
    }
}

export default ConnectDB;




