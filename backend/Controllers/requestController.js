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

  const getRequestsByOwner = async(req,res) =>{
    try{
      const userId= req.user.userId

      const requests = await requestModel.findAll({
        where: { id: userId }, // Owner ID in Request table
        include: [{
          model: petModel,
          as: 'Pet',
          attributes: ['name', 'type', 'age', 'size']
        }]
      });
      const response = requests.map(request => ({
        reqId: request.reqId,
        service: request.service,
        status: request.status,
        startDate: request.startDate,
        endDate: request.endDate,
        startTime: request.startTime,
        endTime: request.endTime,
        pet: request.Pet ? {
          name: request.Pet.name,
          type: request.Pet.type,
          age: request.Pet.age,
          size: request.Pet.size
        } : null
      }));
      res.status(200).json({ success: true, data: response });
    }catch(error){
      console.error("Error in getRequestsByOwner:", error);
      res.status(500).json({ success: false, message: 'Server Error' });

    }
  }

  const updateRequestStatus = async(req,res) => {
    const {reqId, status}=req.body

    try{
      const request = await requestModel.findOne({ where: { reqId } });


        if (!request) {
          return res.status(404).json({ message: "Request not found" });
        }
    
        // Update the request status
        request.status = status;
        await request.save(); // Save the updated request

    res.status(200).json({ message: "Request status updated successfully" });
  }catch(error){
    console.error(error);
    res.status(500).json({ message: "Error updating request status" });
  }
}
  

export  { createRequest, getRequestsForProvider, getRequestsByOwner, updateRequestStatus};

