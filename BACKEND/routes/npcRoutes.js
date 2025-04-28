const express = require('express');
const router = express.Router();
const NPC = require('../models/NPC');

// Listar todos os NPCs
router.get('/', async (req, res) => {
  try {
    const npcs = await NPC.find();
    res.json(npcs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Criar um novo NPC
router.post('/', async (req, res) => {
  const npc = new NPC(req.body);
  try {
    const newNPC = await npc.save();
    res.status(201).json(newNPC);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
