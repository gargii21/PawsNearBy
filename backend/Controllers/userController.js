import { userModel } from "../Config/db1.js"
import bcrypt from "bcrypt";
import axios from "axios";

async function getCoordinates(address) {
    
    const API_KEY = process.env.LOCATIONIQ_TOKEN; 
    if (!API_KEY) {
        console.error("Error: LOCATIONIQ_TOKEN is missing");
        return { latitude: null, longitude: null };
    }
    
    const BASE_URL = `https://us1.locationiq.com/v1/search.php`;

try {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: address,
                format: 'json'
            }
        });
        console.log(response.data);

        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            return { latitude: lat, longitude: lon };
        } else {
            throw new Error('No results found');
        }

    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        return null;
    }

}catch(error){
    console.error("Error fetching coordinates:", error.message);
    return { latitude: null, longitude: null };

}
}

const regUser = async(req , res)=>{
    console.log('in signup')

    try{
        const {name, phone, address, email, password}=req.body
        const info = await userModel.findOne(
            { where: {email}}
        )

        if(info){
            return res.status(400).json({message:'User already exists'})
        }

        const hPassword = await bcrypt.hash(password,10);
   
        const cordinates= await getCoordinates(address);
        console.log("Coordinates:", cordinates);

        if (!cordinates || cordinates.latitude === null || cordinates.longitude === null) {
            return res.status(400).json({ message: "Invalid address, could not fetch coordinates" });
        }

        const newUser = await userModel.create({
            name, phone, address, email, password:hPassword,latitude:cordinates.latitude, longitude:cordinates.longitude

        })

        res.status(200).json({message:'signup successful', user:newUser})
    

    }catch(error){
        res.status(500).json({message: 'errrrorrrr'})
        console.log(error);
    }
}

const basic_signup = async(req,res)=>{
    try{
        const {name, username, email, password, confirmpassword}=req.body

        if(!name || !username || !email || !password || !confirmpassword){
            return res.status(400).json({message:"All fields are required!"})
        }

        if(password!==confirmpassword){
            return res.status(404).json({message:"passoword doesnt match!"})
        }

        const alreadyUser = await userModel.findOne(
            {
                where: {email}
            }
        )
        if(alreadyUser){
            return res.status(400).json({message:"email already exist try logging in"})
        }

        const hpass = await bcrypt.hash(password,10)

        const newbUser = await userModel.create({
            name,
            username,
            email,
            password:hpass
        });

        return res.status(200).json({message:"Signed up Successfully", user: newbUser})
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"erroorrooror"})
    }
   

}

const updateUser = async(req, res)=>{
    
    try{
        // console.log("req.user:", req.user);
        // console.log("req.body:", req.body);
        // console.log("req.params:", req.params);
        // console.log("req.query:", req.query);


    
    const user = await userModel.findByPk(req.body.id);
    
    
    if(!user){
        return res.status(404).json({message:'user not found'})
    }
    //console.log('hiii')
    const {name, phone, address, email, password, role}=req.body

    const update = await userModel.update({name, phone, address, email, password, role},
        {where:{id:req.body.id}}
    )

    if(update){
        res.status(200).json({message:'updated successfully'})
        
    }
    //console.log('hiii')

}catch(error){
    console.log('last error',error)
    return res.status(500).json({message:'server error'})
    
}


    
}

const deleteUser = async(req,res)=>{
    try{
        const user = await userModel.findByPk(req.body.id)
        console.log(req.body.id)
        if(!user){
            return res.status(404).json({message:'user not found'})
        }

        const delete1 = await user.destroy()
        if(!delete1){
            return res.status(404).json({message: 'not deleted'})
        }
    }catch(error){
        return res.status(500).json({message:'server error', error})
    }
}



export {regUser, updateUser, deleteUser, basic_signup, getCoordinates};