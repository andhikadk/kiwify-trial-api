import db from '../config/database.js';
import { Sequelize } from 'sequelize';

const { DataTypes } = Sequelize;

const Question = db.define(
  'questions',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    questionText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isMandatory: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Question;
