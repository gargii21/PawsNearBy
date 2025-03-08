import { userModel } from "../Config/db1.js"
import bcrypt from "bcrypt";

const regUser = async(req , res)=>{
    console.log('in signup')
    try{
    const {name, phone, address, email, password, role}=req.body
    const info = await userModel.findOne(
       { where: {email}}
    )

    if(info){
       return res.status(400).json({message:'User already exists'})
    }

    const hPassword = await bcrypt.hash(password,10);

    const newUser = await userModel.create({
        name, phone, address, email, password:hPassword, role

    })

    res.status(200).json({message:'signup successful', user:newUser})
    

    }catch(error){
        res.status(500).json({message: 'errrrorrrr'})
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



export {regUser, updateUser, deleteUser};