import { providerModel } from "../Config/db1.js"
const prProfile = async(req,res)=>{
    try{
    const prId=req.body.id

    const info = await providerModel.findOne({
        attributes: ['daycare_name','service','address','fees','email','phone','description','experience'],
        where: {prId}   
        
    })
    //console.log(info)
    res.status(200).json(info)
}catch(error){
    console.log(error)
    res.status(500).json();
}



}
export default prProfile;


