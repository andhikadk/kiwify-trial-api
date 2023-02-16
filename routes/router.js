import express from 'express';
import {
  getQuizzes,
  getQuiz,
  createQuiz,
  deleteQuiz,
} from '../controllers/quizController.js';

const router = express.Router();

router
  .get('/quizzes', getQuizzes)
  .get('/quizzes/:id', getQuiz)
  .post('/quizzes', createQuiz)
  .delete('/quizzes/:id', deleteQuiz);

export default router;
