import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const authMiddleware = (req, res, next) => {
    console.log("in auth")
    // console.log(req.cookies);
    const token = req.cookies.token;  
    // console.log("Hello AuthMiddleware")
    if (!token) {
        req.user = null;
        return next();
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        console.log(decoded);
        req.user = decoded;
        return next(); 
    } catch (error) {
        req.user = null;
    }
    next();
};

export default authMiddleware;

