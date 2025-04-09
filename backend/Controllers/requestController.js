import { petModel, requestModel, providerModel } from "../Config/db1.js";

const createRequest = async (req, res) => {
  try {
    const { providerId, petId , service, startDate, endDate, startTime, endTime} = req.body;
    const ownerId = req.user.userId;

    // Fetch the pet with all its information
    const pet = await petModel.findOne({
      where: {
        Pet_id: petId,
        ownerId: ownerId,
      },
    });

    if (!pet) {
      return res.status(404).json({ message: "Pet not found or you do not own this pet" });
    }

    // Create the request
    const request = await requestModel.create({
      prId: providerId,
      id: ownerId,
      pet_id: petId, // assuming your requestModel has a column for petId
      status: "Pending",
      startDate,
      endDate,
      startTime,
      endTime,
      service
    });

    // Send full info back
    res.status(201).json({
      message: "Request sent successfully",
      request: {
        ...request.toJSON(),
        petDetails: pet.toJSON(),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create request", error: error.message });
  }
};

const getRequestsForProvider = async (req, res) => {
    try {
        const provider = await providerModel.findOne({ where: { id: req.user.userId } });
        if (!provider) {
          return res.status(404).json({ message: "Provider not found" });
        }
        
        const providerId = provider.prId;
        
  
      if (!req.user.isProvider) {
        return res.status(403).json({ message: "Access denied. Only providers can access this." });
      }
  
      const requests = await requestModel.findAll({
        where: { prId: providerId },
        include: [
          {
            model: petModel,
            attributes: ['Pet_id', 'name', 'type', 'size', 'age', 'notes']
          }
        ],
        attributes: ['reqId', 'service', 'startDate', 'endDate', 'startTime', 'endTime', 'status']
      });
  
      res.status(200).json({
        message: "Requests fetched successfully",
        requests
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch requests", error: error.message });
    }
  };
  

export  { createRequest, getRequestsForProvider};

