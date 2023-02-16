import Quiz from '../models/Quiz.js';
import Question from '../models/Question.js';
import Answer from '../models/Answer.js';

export const getQuizzes = async (req, res) => {
  try {
    const response = await Quiz.findAll({
      attributes: ['title', 'description'],
      include: [
        {
          model: Question,
          as: 'questions',
          attributes: ['questionText', 'isMandatory'],
          include: [
            {
              model: Answer,
              as: 'answers',
              attributes: ['answerText', 'isCorrect'],
            },
          ],
        },
      ],
      where: {
        isDraft: false,
      },
    });
    res.status(200).json({
      success: true,
      errors: null,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      errors: error,
      data: null,
    });
  }
};

export const getQuiz = async (req, res) => {
  try {
    const response = await Quiz.findOne({
      attributes: ['title', 'description'],
      include: [
        {
          model: Question,
          as: 'questions',
          attributes: ['questionText', 'isMandatory'],
          include: [
            {
              model: Answer,
              as: 'answers',
              attributes: ['answerText', 'isCorrect'],
            },
          ],
        },
      ],
      where: { uuid: req.params.id },
    });
    if (!response) {
      return res.status(404).json({
        success: false,
        errors: 'Quiz not found',
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      errors: null,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      errors: error,
      data: null,
    });
  }
};

export const createQuiz = async (req, res) => {
  const { title, description, isDraft, questions } = req.body;
  try {
    const createdQuiz = await Quiz.create(
      { title, description, isDraft },
      {
        include: [
          {
            model: Question,
            as: 'questions',
            include: [
              {
                model: Answer,
                as: 'answers',
              },
            ],
          },
        ],
      }
    );

    for (const questionData of questions) {
      const { questionText, answers, isMandatory } = questionData;
      const question = await Question.create({
        questionText,
        isMandatory,
        quizUuid: createdQuiz.uuid,
      });

      for (const answerData of answers) {
        const { answerText, isCorrect } = answerData;
        await Answer.create({
          answerText,
          isCorrect,
          questionId: question.id,
        });
      }
    }

    res.status(201).json({
      success: true,
      errors: null,
      data: createdQuiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      errors: error,
      data: null,
    });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const response = await Quiz.findOne({ where: { uuid: req.params.id } });
    if (!response) {
      return res.status(404).json({
        success: false,
        errors: 'Quiz not found',
        data: null,
      });
    }
    await Quiz.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({
      success: true,
      errors: null,
      data: 'Quiz deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      errors: error,
      data: null,
    });
  }
};
