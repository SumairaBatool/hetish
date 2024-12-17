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
        index:true
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
            ref:Video
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

    this.password=bcrypt.hash(this.password, 10)
    next()

})

userSchema.methods.isPasswordCorrect=async function (password) {
 return await bcrypt.compare(password,this.password)
    
}
export const User=mongoose.model("User",userSchema)
