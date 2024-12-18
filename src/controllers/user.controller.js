import {asynchandler} from "../utils/assynchandler.js"
const register=asynchandler(async(req,res)=>{
    res.status(200).json({
        message:"chai our code"
    })
})
export {register}