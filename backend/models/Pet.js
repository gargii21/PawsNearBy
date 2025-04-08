import {  DataTypes} from "sequelize";
import { sequelize } from "../Config/db1.js";
import { providerModel, userModel } from "../Config/db1.js";
//import{ User } from "./User.js";


export const Pet = (sequelize) => {
    return sequelize.define('Pet',{
    Pet_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    ownerId:{
        type:DataTypes.INTEGER,
        references: {
            model: userModel,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    providerId:{
        type:DataTypes.INTEGER,
        // references: {
        //     model: providerModel,
        //     key: "prId",
        // },
        // onUpdate: "CASCADE",
        // onDelete: "CASCADE",
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    breed:{
        type:  DataTypes.STRING,
        allowNull: false,  
    },
    age:{
        type:  DataTypes.INTEGER,
        allowNull: false,  
    },
    weight:{
        type:  DataTypes.FLOAT,
        allowNull: false,  
    },
    service:{
        type:DataTypes.STRING,
        allowNull:false

    },
    notes:{
        type: DataTypes.TEXT,
    },
    startDate:{
        type:DataTypes.DATE
    },
    endDate:{
        type:DataTypes.DATE
    },
    additionalMessage:{
        type: DataTypes.TEXT,
    }


    },{timestamps: false})
   
   
};



export default Pet;