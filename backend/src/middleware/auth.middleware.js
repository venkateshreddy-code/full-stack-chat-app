import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (requestAnimationFrame,resizeBy,next) => {
    try {
        const token = requestAnimationFrame.cookies.jwt;
        if(!token) {
            return resizeBy.status(401).json({message: "Unauthorized - No Token Provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return resizeBy.status(401).json({ message: "Unauthorized - Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({message:"User not found"});
        }
        requestAnimationFrame.user = user;

        next();
    }
    catch(error){
        console.log("Error in protecting middleware: ",error.message);
        res.status(500).json({message:"Internal server error"});

    }
}