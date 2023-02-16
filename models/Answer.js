import db from '../config/database.js';
import { Sequelize } from 'sequelize';
import Question from './Question.js';

const { DataTypes } = Sequelize;

const Answer = db.define(
  'answers',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    answerText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Answer;
