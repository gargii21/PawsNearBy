import { DataTypes } from 'sequelize';

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
        status: {
            type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected'),
            defaultValue: 'Pending'
        }
    }, { timestamps: false });
};

export default Request;
