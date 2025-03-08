import { DataTypes} from "sequelize";



 export const User = (sequelize) => {
    return sequelize.define('User1',
    {
        prId:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,

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
        // role:{
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // }
        prLatitude:{
            type: DataTypes.DECIMAL(9,6),
        },
        prLongitude:{
            type: DataTypes.DECIMAL(9,6),
        }
    },
    {timestamps: false}
)

};

export default User;