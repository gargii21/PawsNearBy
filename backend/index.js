import express from "express";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import userRoutes from './routes/userRoutes.js';
//import providerRoutes from './routes/providerRoutes.js';
import {syncdb} from './Config/db1.js';
import cookieParser from "cookie-parser";
//import User from './models/User.js'
//import {Pet, initPetModel} from './models/Pet.js'

import cors from "cors";

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:'http://localhost:5177',
  methods: "GET,POST,PUT,DELETE",
  credentials:true,
}));

//Routes
app.use('/', userRoutes);
//app.use('/provider', providerRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async() => {
  console.log(`Server is running on port ${PORT}`);
  await syncdb();
});
