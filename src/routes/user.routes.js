import { Router } from "express";
import {register} from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middelware.js"
const router=Router()
router.route("/register").post(
    // middleware valiation
    upload.fields([
        {
    name:"avatar",
    maxCount:1
        },
        {
            name:"cover-image",
            maxCount:1
        }
    ]),
    register)


export default router