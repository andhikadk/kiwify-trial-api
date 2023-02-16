import express from 'express';
import cors from 'cors';
import router from './routes/router.js';
import db from './config/database.js';

const app = express();
const port = 5000;

// (async () => {
//   await db.sync();
// })();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
