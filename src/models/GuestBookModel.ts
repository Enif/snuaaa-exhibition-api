import { Model, DataTypes } from "sequelize";
import { sequelize } from './sequelize';
import { UserModel } from ".";

class GuestBookModel extends Model {

}

GuestBookModel.init({
    guestbook_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    author_id: {
        type: DataTypes.INTEGER
    },
    text: {
        type: DataTypes.TEXT
    },

}, {
    sequelize,
    modelName: 'guestbook',
    tableName: 'tb_guestbook',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

GuestBookModel.belongsTo(UserModel, {
    foreignKey: 'author_id',
    targetKey: 'user_id',
    as: 'author'
})

export default GuestBookModel;
