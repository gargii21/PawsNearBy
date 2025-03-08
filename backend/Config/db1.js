import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Pet from '../models/Pet.js';
dotenv.config();

const{DB_HOST,DB_USER,DB_DB, DB_PASS } = process.env;

const sequelize = new Sequelize(DB_DB, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false
    // }
  },
  logging: false, // Set to false in production
});

//Models
const userModel = User(sequelize);
const petModel = Pet(sequelize);
const providerModel = provider(sequelize);
    
async function syncdb(){
  try{
    await sequelize.authenticate();
    console.log('Database Connection executed successfully');
    
    await sequelize.sync({alter:true});
    console.log('Database synced successfully');
    }catch(error){
      console.error('Error initializing database',error);
    }
};   

export {sequelize, userModel, petModel, syncdb}