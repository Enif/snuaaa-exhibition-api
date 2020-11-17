import { Model, DataTypes } from "sequelize";
import { sequelize } from './sequelize';

class PhotoModel extends Model {

}

PhotoModel.init({
    photo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    photograper: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING
    },
    location: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE
    },
    equipment: {
        type: DataTypes.STRING
    },
    exposure: {
        type: DataTypes.STRING
    },
    processing: {
        type: DataTypes.STRING
    },
    story: {
        type: DataTypes.TEXT
    },
    file_path: {
        type: DataTypes.STRING
    },
    xPos: {
        type: DataTypes.FLOAT
    },
    yPos: {
        type: DataTypes.FLOAT
    },
    zPos: {
        type: DataTypes.FLOAT
    },
    rotation: {
        type: DataTypes.FLOAT
    }
}, {
    sequelize,
    modelName: 'photo',
    tableName: 'tb_photo',
    timestamps: false,
    underscored: true
})

export default PhotoModel;
