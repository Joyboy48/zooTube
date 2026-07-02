import {asyncHandler} from "../utils/asyncHandler.js"
import {apiError} from "../utils/apiError.js"
import jwt from "jsonwebtoken"
import {User} from "../models/user.models.js"

export const verifyJWT = asyncHandler(async(req,res,next)=>{
    try {
        const token = 
        req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

       // console.log(token);
        
    
        if (!token) {
            throw new apiError(401,"Unauthorized request ")
        }
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)  
    
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        )
    
        if(!user){
            throw new apiError(401,"invalid access token")
        }
    
        req.user = user
        next()
    } catch (error) {
        throw new apiError(401,error?.message || "invalid access token")
    }
})

// Optional auth — attaches req.user if token is valid, but allows guests (no token) through
export const verifyJWTOptional = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return next(); // guest — no token, just continue

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if (user) req.user = user;
    } catch {
        // invalid token — treat as guest
    }
    next();
});