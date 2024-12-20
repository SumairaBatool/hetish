import { asynchandler } from "../utils/assynchandler.js"
import {apiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudnairy} from "../utils/cloudnairy.js"
import { apiResponse } from "../utils/apiResponse.js"

const register = asynchandler(async (req, res) => {
    res.status(200).json({
        message: "chai our code"
    })

    // %%%%%%%%%%%%%%%algorithm%%%%%%%%%%%%%%%//
    //get user ddetail from front endd
    //validation- not empty
    // check if user alreaddy exists: username email
    // check for images, check for avatar
    //upload them to cloudnairy, avatar
    //create user object - create entry in db\
    // remove password and refresh token fielkd from response
    //check for user creation
    //return response


    const { fullname, email, username, password } = req.body
    console.log("email", email);
    console.log("email", fullname);
    console.log("email", username);
    console.log("email", password);


    // if (fullname === "") {
    //     throw new apiError(400, "full name is required")
    // }
    // empty check
    if ([ fullname, email, password, username].some((field) =>field?.trim() === "",)
){
    throw new apiError(400,"All fields are required")
}
// email validation
const existedUser=User.findOne({
    $or:[{ username },{ email }]
})
if(existedUser){
    throw new apiError(409,"user name with this amail isalready exist")
}
// image validation
const avatarLocalPath = req.files?.avatar[0]?.path;
req.files?.coverImageLocalPath=req.files?.coverImage[0]?.path
if(!avatarLocalPath){
    throw new apiError (400,"avtar file is required")

}
// upload on cloudnairy
const avatar=await uploadOnCloudnairy(avatarLocalPath)
const coverImage=await uploadOnCloudnairy
(coverImageLocalPath)
if(!avatar){
    throw new apiError (400,"avtar file is required")
}
const user=await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || " ",
    email,
    password,
    username:username.toLowerCase()
})


const createdUser=await User.findById(user._id).select(
    " -password -refreshToken"
)

if(!createdUser){
    throw new apiError(500,"something went wrong while registering")
} 

return res.status(201).json(
    new apiResponse(200, createdUser,"user registered successfully")
)

})
export { register }