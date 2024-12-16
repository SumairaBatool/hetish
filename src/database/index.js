import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectdb=async()=>{
try {
  const connectioninstance=  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
  console.log(`mongo db connected !!!! DB HOST ${connectioninstance.connection.host}`);
} catch (error) {
    console.log("mongo db connection error",error);
    process.exit(1)
}
}
export default connectdb;