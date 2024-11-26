const Quiz = require('../models/quizModel');
const Result = require('../models/resultModel');

// Submit Answer
// o	Endpoint to submit an answer for a specific question in a quiz.
// o	Return immediate feedback if the answer is correct or incorrect and provide the correct answer if the user was wrong.
const submitAnswer = async (req, res) => {
  const { userId, quizId, questionId, selected_option } = req.body;

  // Validate request body
  if (!userId || !quizId || !questionId || selected_option === undefined) {
    return res.status(400).json({
      status: false,
      status_code: 400,
      message: 'Missing required fields',
    });
  }

  try {
    // Fetch the quiz and question
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        status: false,
        status_code: 404,
        message: 'Quiz not found',
      });
    }

    const question = quiz.questions.id(questionId);
    if (!question) {
      return res.status(404).json({
        status: false,
        status_code: 404,
        message: 'Question not found',
      });
    }

    // Check if the selected answer is correct
    const isCorrect = question.correct_option === selected_option;

    // Find or create a Result document for the user and quiz
    let result = await Result.findOne({ quiz_id: quizId, user_id: userId });
    if (!result) {
      // Create a new result entry if none exists
      result = new Result({
        quiz_id: quizId,
        user_id: userId,
        score: 0,
        answers: [],
      });
    }

    // Add the user's answer to the result
    result.answers.push({
      question_id: questionId,
      selected_option,
      is_correct: isCorrect,
    });

    // Update the score if the answer is correct
    if (isCorrect) {
      result.score += 1;
    }

    // Save the updated result
    await result.save();

    // Respond to the client
    res.status(200).json({
      status: true,
      status_code: 200,
      message: isCorrect ? 'Correct answer!' : 'Incorrect answer',
      is_correct: isCorrect,
      ...(isCorrect ? {} : { correct_option: question.correct_option }),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      status_code: 500,
      message: 'Internal server error',
    });
  }
};

// Get Results
// o	Endpoint to get the user's results for a specific quiz.
// o	Return the score and a summary of the user's answers (correct/incorrect).

const getResults = async (req, res) => {
  try {
    const { quiz_id, user_id } = req.query;
    const results = await Result.findOne({ quiz_id, user_id });
    if (!results) {
      return res.status(404).json({
        status: false,
        status_code: 404,
        message: 'Results not found',
      });
    }

    res.json({
      status: true,
      status_code: 200,
      message: 'Results fetched successfully',
      data: results,
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
  submitAnswer,
  getResults,
};
