import { userModel } from "../Config/db1.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
 
const login = async(req,res)=> {
    //console.log(userModel);
    
        const {email , password}=req.body

    
    try{
        
        const data=await userModel.findOne({
            attributes: ['email','password','id','isProvider'],
            where: {email:email}
        })
        if (!data){
            return res.status(404).json({message:'user not found'});
            
        }
        // console.log("User found:", data);
        // console.log(data.password)
        // console.log(password)
        //console.log(data.isProvider);
        const isPasswordValid = await bcrypt.compare(password, data.password)
        
        if(!isPasswordValid){
            return res.status(404).json({message: 'invalid password'})
        }

        const user = data.toJSON();

        let token
        try{
         token = jwt.sign(
            {userId:user.id, email:user.email, role:user.role, isProvider:user.isProvider},
        process.env.JWT_SECRET,
        {expiresIn: '1d'})
        //console.log(token);
        }catch(error){
            console.log("error generating token")
            return res.status(500).json({message:'serverr error'})
        }

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Lax',      // allows cross-origin cookies (adjust if needed)
            secure: false,        // must be false for localhost (true only on HTTPS)
            maxAge: 3600000,
          });
          

        res.status(200).json({message:'login successful'})
    

    }catch(error){
        console.log(error);
        return res.status(400).json({message:'error in login', error:error.message})

    }
};

export default login;