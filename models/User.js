import { Model, ENUM, STRING, TEXT, INTEGER} from "sequelize";

class User extends Model{}

const initUserModel = sequelize => {
    User.init(
        {
            id:{
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,

            },
        email:{
            type: STRING({length:256}),
            allowNull: false,
            unique: true,
            
        },
        password: {
            type: STRING({length: 256}),
            allowNull: false,
            
        }
        }
   ,{sequelize} );


return User.sync().then(()=> console.log('Created User Table'))
.catch(console.error);
};

export { User, initUserModel };