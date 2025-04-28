const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');

// Listar todas as conquistas
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Criar uma nova conquista
router.post('/', async (req, res) => {
  const achievement = new Achievement(req.body);
  try {
    const newAchievement = await achievement.save();
    res.status(201).json(newAchievement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
