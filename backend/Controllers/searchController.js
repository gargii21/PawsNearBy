import { userModel } from "../Config/db1.js";
import { providerModel } from "../Config/db1.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { Sequelize } from 'sequelize';
 
const search = async(req,res)=> {
    try{
    const {lat,lon,service}=req.body
        console.log(service)
    if(!lat || !lon || !service){
        return res.status(400).json({error:"missing info"})
    }
    
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    console.log(latitude);
    console.log(longitude);

    const query = `
  SELECT *, 
        (6371000 * acos(
          cos(radians(:lat)) * cos(radians(prLatitude)) * 
          cos(radians(prLongitude) - radians(:lon)) + 
          sin(radians(:lat)) * sin(radians(prLatitude))
        )) AS distance
      FROM providers
      WHERE service = :service
      ORDER BY distance
`;
   
    const results = await providerModel.findAll({
      attributes: {
          include: [
              [
                  Sequelize.literal(`
                      6371000 * acos(
                          cos(radians(${latitude})) * cos(radians("prLatitude")) * 
                          cos(radians("prLongitude") - radians(${longitude})) + 
                          sin(radians(${latitude})) * sin(radians("prLatitude"))
                      )
                  `),
                  "distance"
              ]
          ]
      },
      where: { service },
      order: [[Sequelize.literal("distance"), "ASC"]],
  });
  
      console.log("result:",results);
      res.json({
        success: true,
        message: "Daycares sorted by distance",
        data: results,
      });
  
     //res.status(200).json(results);
    }catch(error){
        console.log("error in searching daycares")
        console.error(error)
        res.status(404).json({error:'errors'})
    }
};

export default search;