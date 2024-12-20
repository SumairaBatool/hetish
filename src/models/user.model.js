import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowecase:true,
        trim:true,
        index:true//to make searchable
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowecase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{   //matlab photo
        type:String,  //cloudinary url
        required:true,
        unique:true,
    },
    coverImage:{
            type:String,
           
            
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,'passwor is required']
    },
    refreshToken:{
        type:String
    }

},
{
    timestamps:true
}
)
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password=await bcrypt.hash(this.password, 10)
    next()

})
userSchema.methods.isPasswordCorrect=async function (password) {
 return await bcrypt.compare(password,this.password)   
}
userSchema.methods.generateAccessToken=function () {
  return  jwt.sign(
        {
            id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
userSchema.methods.generateRefreshToken=function () {
    return  jwt.sign(
        {
            id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
        }
    )

}
export const User=mongoose.model("User",userSchema)
