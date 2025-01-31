import express from "express";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import {User, initUserModel} from './models/User.js'


dotenv.config();

const{DB_HOST,DB_USER,DB_DB, DB_PASS } = process.env;
    const sequelize = new Sequelize(DB_DB, DB_USER, DB_PASS,{
        host: DB_HOST,
        dialect: 'postgres',
    });


    sequelize
    .authenticate()
    .then(async ()=> {console.log('Connected');
     await initUserModel(sequelize); // Call the function to initialize the model
    
     
})
    .catch(console.error);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
