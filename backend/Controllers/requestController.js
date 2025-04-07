import { petModel, requestModel } from "../Config/db1.js";
import jwt from "jsonwebtoken";

const createRequest = async (req, res) => {
    try {
        const { providerId, petId } = req.body;  // Extract providerId and petId from the request body
        const ownerId=req.user.userId;

        // Check if the pet exists and belongs to the owner
        // const pet = await petModel.findOne({ where: { Pet_id: petId, ownerId } });
        // if (!pet) {
        //     return res.status(404).json({ message: 'Pet not found or you do not own this pet' });
        // }

        // Create a new request record in the 'Request' table
        const request = await requestModel.create({
            prId: providerId, // caregiver/provider ID
            id: ownerId, // pet owner ID
            status: 'Pending' // initial status
        });

        // Send response back with the created request
        res.status(201).json({ message: 'Request sent successfully', request });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create request', error: error.message });
    }
};

export default createRequest;