// src/routes/quizRoutes.js
const express = require('express');
const { createQuiz, getQuiz, updateQuiz,deleteQuiz } = require('../controllers/quizController');
const { submitAnswer, getResults } = require('../controllers/resultController');
const router = express.Router();

// Quiz routes
router.post('/create_quiz', createQuiz);        // Create a new quiz with a set of questions.
router.get('/get_quiz/:id', getQuiz);           // Fetch a quiz by its ID without revealing the correct answers.
router.patch('/update_quiz/:id', updateQuiz);   // Update quiz.
router.delete('/delete_quiz/:id', deleteQuiz);  // Delete quiz

// Answer and Result routes
router.post('/submit_answer', submitAnswer);    // Endpoint to submit an answer for a specific question in a quiz.
router.get('/get_results', getResults);         // Endpoint to get the user's results for a specific quiz.

module.exports = router;
