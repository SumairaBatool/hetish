// require('dotenv').config({path:'./env'})


import dotenv from "dotenv"
import connectdb from "./database/index.js";
// introduce recently
dotenv.config({
    path: './env'
})


connectdb()










// import express from "express"
// const app=express()
// ;const connectdb=(async()=>{
// try {
//   await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     app.on("error",(err)=>{
//         console.log("error",err);
//         throw err
//     })
//     app.listen(process.env.PORT,()=>{
//         console.log(`app is listening at port ${process.env.PORT}`);
//     })
// } catch (error) {
//     console.log("db connect error:",error);
//     throw err
// }
// })()