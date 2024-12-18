import { v2 as cloudnairy } from "cloudinary"
import fs from "fs"


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDNAIRY_CLOUD_NAME,
    api_key: process.env.CLOUDNAIRY_API_KEY,
    api_secret: process.env.CLOUDNAIRY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudnairy = async (localFilePath) => {
    try {

        if (!localFilePath)
            return null
        // upload on cloudnairy
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"

        }
        )
        // file has been successfully 
        console.log("file uploaddedd successfully");
        response.url()
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)//remove the locally save temporary file as they upload got failed
        return null
    }
}

export {uploadOnCloudnairy}