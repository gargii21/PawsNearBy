import { userModel } from "../Config/db1.js";
import { providerModel } from "../Config/db1.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
 
const search = async(req,res)=> {
    const {latitude,longitude}=req.body

    if(!latitude || !longitude){
        return res.status(400).json({error:"missing info"})
    }

    // const query =
    // SELECT prId, name, address, prLatitude, prLongitude, 
    // ST_DistanceSphere(geom, ST_MakePoint($1, $2)) AS distance
    // FROM daycare_services
    // WHERE service_type = $3
    // ORDER BY distance ASC
    // LIMIT 10;
   
};

export default search;