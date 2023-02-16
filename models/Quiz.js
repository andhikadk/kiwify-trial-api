import db from '../config/database.js';
import { Sequelize } from 'sequelize';
import Question from './Question.js';
import Answer from './Answer.js';

const { DataTypes } = Sequelize;

const Quiz = db.define(
  'quizzes',
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    isDraft: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
  }
);

Quiz.hasMany(Question);
Question.belongsTo(Quiz, { foreignKey: 'quizUuid' });
Question.hasMany(Answer);
Answer.belongsTo(Question, { foreignKey: 'questionId' });

export default Quiz;

// (async () => {
//   await db.sync();
// })();
