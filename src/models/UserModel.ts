import { Model, DataTypes } from "sequelize";
import { sequelize } from './sequelize';

class UserModel extends Model {

}

UserModel.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nickname: {
        type: DataTypes.STRING(32),
    },
    login_at: {
        type: DataTypes.DATE
    },
    didVoted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {
    sequelize,
    modelName: 'user',
    tableName: 'tb_user',
    timestamps: true,
    underscored: true
})

export default UserModel;
