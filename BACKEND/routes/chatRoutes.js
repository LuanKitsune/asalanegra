const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

// Listar todos os chats
router.get('/', async (req, res) => {
  try {
    const chats = await Chat.find().populate('participants').populate('messages.sender');
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Criar um novo chat
router.post('/', async (req, res) => {
  const chat = new Chat(req.body);
  try {
    const newChat = await chat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
