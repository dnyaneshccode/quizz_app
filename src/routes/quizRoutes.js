// src/routes/quizRoutes.js
const express = require('express');
const { createQuiz, getQuiz } = require('../controllers/quizController');
const { submitAnswer, getResults } = require('../controllers/resultController');
const router = express.Router();

// Quiz routes
router.post('/quizzes', createQuiz);
router.get('/quizzes/:id', getQuiz);

// Answer and Result routes
router.post('/answers', submitAnswer);
router.get('/results', getResults);

module.exports = router;
