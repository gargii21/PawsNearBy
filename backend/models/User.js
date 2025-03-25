import { DataTypes} from "sequelize";



 export const User = (sequelize) => {
    return sequelize.define('User1',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        name:{
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
        // role:{
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // }
        latitude:{
            type: DataTypes.DECIMAL(9,6),
        },
        longitude:{
            type: DataTypes.DECIMAL(9,6),
        }
    },
    { tableName: "User1", timestamps: false }
)

};

export default User;