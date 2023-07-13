import mongoose from "mongoose";
const connectDB = async()=>{
    try{
        const conn=await mongoose.connect("mongodb://127.0.0.1:27017/E-commerce-Website")
        console.log("connection successful")
       
    }
    catch(err)
    {
        console.log(err)
    }

}
export default connectDB;
