import { petModel } from "../Config/db1.js";
import jwt from "jsonwebtoken";

const addPet = async (req, res) => {
  try {
    // ✅ Extract token from cookies instead of headers
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // ✅ Decode token to get ownerId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const ownerId = decoded.userId;  // Ensure `userId` is stored in JWT during login

    // ✅ Extract providerId and pet details from request body
    const {  name, type, age, size, notes} = req.body;

    // if (!providerId) {
    //   return res.status(400).json({ error: "Provider ID is required" });
    // }

    const existingPet = await petModel.findOne({ where: { ownerId, name } });

    if (existingPet) {
      return res.status(400).json({ error: "This pet already belongs to another owner" });
    }

    // ✅ Insert pet details into database
    const newPet = await petModel.create({
      ownerId,
      name,
      type,
      size,
      age,
      notes,
    });

    res.status(201).json({ message: "Pet added successfully!", data: newPet });
  } catch (error) {
    console.error("Error adding pet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default addPet;
