import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';

class PhotoModel extends Model {

}

PhotoModel.init({
  photo_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    primaryKey: true,
  },
  model_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  photograper: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.STRING,
  },
  equipment: {
    type: DataTypes.STRING,
  },
  exposure: {
    type: DataTypes.STRING,
  },
  processing: {
    type: DataTypes.STRING,
  },
  story: {
    type: DataTypes.TEXT,
  },
  file_path: {
    type: DataTypes.STRING,
  },
  thumbnail_path: {
    type: DataTypes.STRING,
  },
  can_be_voted: {
    type: DataTypes.BOOLEAN,
  },
  is_video: {
    type: DataTypes.BOOLEAN,
  },
}, {
  sequelize,
  modelName: 'photo',
  tableName: 'tb_photo',
  timestamps: false,
  underscored: true,
});

export default PhotoModel;
