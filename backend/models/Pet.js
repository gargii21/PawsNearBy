import {  DataTypes} from "sequelize";
//import{ User } from "./User.js";


export const Pet = (sequelize) => {
    return sequelize.define('Pet',{
        Pet_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        
        
    },
    type:{
        type:  DataTypes.STRING,
        allowNull: false,
        
        
    },
    breed:{
        type:  DataTypes.STRING,
        allowNull: false,
       
        
    },
    age:{
        type:  DataTypes.INTEGER,
        allowNull: false,
        
        
    }

    },{timestamps: false})
   
   
};



export default Pet;