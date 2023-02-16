import { Sequelize } from 'sequelize';

const db = new Sequelize('kiwify_trial', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
