// import { DataTypes} from "sequelize";



//  export const provider = (sequelize) => {
//     return sequelize.define('provider',
//     {
//         prId:{
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,

//         },
//         daycare_name:{
//             type: DataTypes.STRING,
//             //allowNull: false,
//             //unique: true,
        
//         },
//         owner_name:{
//             type: DataTypes.STRING,
//             //allowNull: false,
//             //unique: true,
        
//         },
//         phone:{
//             type: DataTypes.BIGINT,
//             //allowNull: false,
//             //unique: true,
        
//         },
//         address:{
//             type: DataTypes.TEXT,
//             //allowNull: false,
//             //unique: true,
//         },
//         email:{
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
        
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
        
//         },
//         service:{
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         prLatitude:{
//             type: DataTypes.DECIMAL(9,6),
//         },
//         prLongitude:{
//             type: DataTypes.DECIMAL(9,6),
//         }
//     },
//     {timestamps: false}
// )

// };

// export default provider;

import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

const Provider = (sequelize) => {
    const Provider = sequelize.define('Provider', {
        prId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        daycare_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        owner_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        service: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prLatitude: {
            type: DataTypes.DECIMAL(9, 6)
        },
        prLongitude: {
            type: DataTypes.DECIMAL(9, 6)
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: true  // Optional field for customer reviews
        },
        fees: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false // Required field for provider fees
        }
    }, { timestamps: false });

    // Password Hashing
    Provider.beforeCreate(async (provider) => {
        provider.password = await bcrypt.hash(provider.password, 10);
    });

    return Provider;
};

export default Provider;
