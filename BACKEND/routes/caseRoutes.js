const express = require('express');
const router = express.Router();
const Case = require('../models/Case');

// Listar todos os casos
router.get('/', async (req, res) => {
  try {
    const cases = await Case.find().populate('assignedTo').populate('relatedEntities');
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Criar um novo caso
router.post('/', async (req, res) => {
  const newCase = new Case(req.body);
  try {
    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
