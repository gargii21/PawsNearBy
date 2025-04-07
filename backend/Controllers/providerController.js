import { providerModel, userModel } from '../Config/db1.js';
import { getCoordinates } from './userController.js';

export const addProvider = async (req, res) => {
    //console.log("🔹 Route Hit: Data Received =>", req.body);  // Debugging log

    if (!req.user || !req.user.userId) {
        console.log(req.user)
        return res.status(401).json({ message: 'Unauthorized. Please log in or sign up first.' });
    }
    
    const { daycare_name, owner_name, phone, address, email, password, service, description, fees, experience } = req.body;
    const userId= req.user.userId
    const cordinates= await getCoordinates(address);
    console.log(cordinates.latitude);
    console.log(cordinates.longitude);
    try {
        const result = await providerModel.create({
            id:userId,
            daycare_name,
            owner_name,
            phone,
            address,
            email,
            password,
            service,
            prLatitude:cordinates.latitude,
            prLongitude:cordinates.longitude,
            description,
            fees,
            experience
        });
        await userModel.update(
            { isProvider: true },
            { where: { id: req.user.userId } }
        );

        res.json({ success: true, data: result });
    } catch (error) {
        console.log("Error adding provider:", error);   
        res.status(500).json({ error: error.message });
    }
};

export default addProvider;
