const Quiz = require('../models/quizModel');

// Create Quiz
// o	Endpoint to create a new quiz with a set of questions
// o	Each question should have 4 answer options and indicate the correct answer.
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
// o	Endpoint to fetch a quiz by its ID.
// o	Return the questions without revealing the correct answers.

const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).select(
      '-questions.correct_option',
    );
    if (!quiz) {
      return res.status(404).json({
        status: false,
        status_code: 404,
        message: 'Quiz not found with requested id',
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

// Update Quiz
const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, questions } = req.body;

    // Find the quiz by ID and update it
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { title, description, questions },
      { new: true, runValidators: true },
    );

    if (!updatedQuiz) {
      return res.status(404).json({
        status: false,
        status_code: 404,
        message: 'Quiz not found with requested id',
      });
    }

    res.status(200).json({
      status: true,
      status_code: 200,
      message: 'Quiz updated successfully',
      data: updatedQuiz,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      status_code: 500,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

//   Delete quizz.
const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) {
      return res.status(404).json({
        status: false,
        status_code: 404,
        message: 'Quiz not found with requested id',
      });
    }
    res
      .status(200)
      .json({
        status: true,
        status_code: 200,
        message: 'Quiz deleted successfully',
      });
  } catch (err) {
    res.status(500).json({
      status: false,
      status_code: 500,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

module.exports = {
  createQuiz,
  getQuiz,
  updateQuiz,
  deleteQuiz
};
