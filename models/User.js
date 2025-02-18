import { DataTypes} from "sequelize";



 export const User = (sequelize) => {
    return sequelize.define('User1',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        
        }
    },
    {timestamps: false}
)

};

export default User;