import { DataTypes} from "sequelize";
import { userModel } from "../Config/db1.js";




 export const provider = (sequelize) => {
    return sequelize.define('provider',
    {
        prId:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        id:{
            type: DataTypes.INTEGER,
            references:{
                model: 'User1',
                key:'id'
            }
        },
        daycare_name:{
            type: DataTypes.STRING,
            //allowNull: false,
            //unique: true,
        
        },
        owner_name:{
            type: DataTypes.STRING,
            //allowNull: false,
            //unique: true,
        
        },
        phone:{
            type: DataTypes.BIGINT,
            //allowNull: false,
            //unique: true,
        
        },
        address:{
            type: DataTypes.TEXT,
            //allowNull: false,
            //unique: true,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,   
        
        },
        prLatitude:{
            type: DataTypes.DECIMAL(9,6),
        },
        prLongitude:{
            type: DataTypes.DECIMAL(9,6),
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true  // Optional field for customer reviews
        },
        fees: {
            type: DataTypes.FLOAT,
            //allowNull: false // Required field for provider fees
        },
        experience:{
            type: DataTypes.INTEGER,
            
        },
        service:{
            type:DataTypes.STRING,
            //allowNull:false,
    
        }

    },
    {tableName: "providerv2",timestamps: false}
)

};

export default provider;

