import { userModel } from "../Config/db1.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
 
const login = async(req,res)=> {
    //console.log(userModel);
    
        const {email , password}=req.body

    
    try{
        const data=await userModel.findOne({
            attributes: ['email','password','id','role'],
            where: {email:email}
        })
        if (!data){
            return res.status(404).json({message:'user not found'});
            
        }
        // console.log("User found:", data);
        // console.log(data.password)
        // console.log(password)
        const isPasswordValid = await bcrypt.compare(password, data.password)
        
        if(!isPasswordValid){
            return res.status(404).json({message: 'invalid password'})
        }
        let token
        try{
         token = jwt.sign(
            {userId:data.id, email:data.email, role:data.role},
        process.env.JWT_SECRET,
        {expiresIn: '1d'})

        }catch(error){
            console.log("error generating token")
            return res.status(500).json({message:'serverr error'})
        }

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000, // 1 hour
        });

        res.status(200).json({message:'login successful'})
    

    }catch(error){
        return res.status(400).json({message:'error in login', error:error.message})

    }
};

export default login;