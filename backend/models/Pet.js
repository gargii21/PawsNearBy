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
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    size:{
        type: DataTypes.STRING,
        //allowNull: false,
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    age:{
        type:  DataTypes.INTEGER,
        allowNull: false,  
    },
    notes:{
        type: DataTypes.TEXT,
    },
    },{timestamps: false})
   
   
};



export default Pet;