const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Listar todos os quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Criar um novo quiz
router.post('/', async (req, res) => {
  const quiz = new Quiz(req.body);
  try {
    const newQuiz = await quiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
