const Quiz = require('../models/quizModel');

// Create Quiz
const createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const quiz = new Quiz({ title, questions });
    await quiz.save();

    res.status(201).json({
      status: true,
      status_code: 201,
      message: 'Quiz created successfully',
      data: quiz,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// Get Quiz
const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).select(
      '-questions.correct_option',
    );
    if (!quiz) {
      return res.status(404).json({
        status: false,
        status_code: 404,
        message: 'Quiz not found',
      });
    }

    res.json({
      status: true,
      status_code: 200,
      message: 'Quiz fetched successfully',
      data: quiz,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = {
  createQuiz,
  getQuiz,
};
