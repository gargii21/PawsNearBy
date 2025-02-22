import express from "express";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import userRoutes from './routes/userRoutes.js';
import {syncdb} from './Config/db1.js';
import cookieParser from "cookie-parser";
//import User from './models/User.js'
//import {Pet, initPetModel} from './models/Pet.js'




const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async() => {
  console.log(`Server is running on port ${PORT}`);
  await syncdb();
});
