// require('dotenv').config({path:'./env'})


import dotenv from "dotenv"
import connectdb from "./database/index.js";
import {app} from "./app.js"
// introduce recently
dotenv.config({
    path: './env'
})


connectdb()
.then(()=>{
    // .........khud sy likha.........//
    app.on("ERROR:",(error)=>{
        console.log("error:",error);
        throw error;
    })
    // .....................//
    app.listen(process.env.PORT||8000,()=>{
        console.log(`app running at port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("mongo db connection failed!!!",err);
})









                    // ****first way to connect with db****//
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