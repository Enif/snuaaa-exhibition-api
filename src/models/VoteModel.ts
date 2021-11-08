import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';

class VoteModel extends Model {

}

VoteModel.init({
  vote_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  isMember: {
    type: DataTypes.BOOLEAN,
  },
  photo_id: {
    type: DataTypes.INTEGER,
  },
}, {
  sequelize,
  modelName: 'vote',
  tableName: 'tb_vote',
  timestamps: false,
  underscored: true,
});

export default VoteModel;
