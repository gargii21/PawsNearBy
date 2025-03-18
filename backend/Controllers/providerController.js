import { providerModel } from '../Config/db1.js';
import Provider from '../models/provider.js';

export const addProvider = async (req, res) => {
    console.log("🔹 Route Hit: Data Received =>", req.body);  // Debugging log
    
    const { daycare_name, owner_name, phone, address, email, password, service, prLatitude, prLongitude, review, fees } = req.body;

    try {
        const result = await providerModel.create({
            daycare_name,
            owner_name,
            phone,
            address,
            email,
            password,
            service,
            prLatitude,
            prLongitude,
            review,
            fees
        });

        res.json({ success: true, data: result });
    } catch (error) {
        console.log("Error adding provider:", error);
        res.status(500).json({ error: error.message });
    }
};

export default addProvider;
