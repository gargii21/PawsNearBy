import { DataTypes } from 'sequelize';
import { petModel } from '../Config/db1.js';

const Request = (sequelize) => {
    return sequelize.define('Request', {
        reqId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        prId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pet_id: {
            type: DataTypes.INTEGER,
            // references:{
            //     model: petModel,
            //     key: "Pet_id"
            // },
            // onUpdate: "CASCADE",
            // onDelete: "CASCADE",
            //allowNull: false
        },
        status: {
            type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected'),
            defaultValue: 'Pending'
        },
        service:{
            type: DataTypes.STRING,
        },
        startDate:{
            type:DataTypes.DATE
        },
        endDate:{
            type:DataTypes.DATE
        },
        startTime:{
            type:DataTypes.TIME
        },
        endTime:{
            type:DataTypes.TIME
        },

    }, { timestamps: false });
};

export default Request;
