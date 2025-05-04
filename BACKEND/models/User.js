const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  namecomplete: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: "Novo pesquisador da organização"
  },
  avatar: {
    type: String,
    default: "/default-avatar.png"
  },
  level: {
    type: Number,
    default: 1
  },
  patent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patent",
    default: "6814698ea2b08f17e4d32ecf"
  },
  experience: {
    type: Number,
    default: 0
  },
  unlockedContent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ents"
  }],
  completedQuizzes: [{
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz"
    },
    score: Number,
    completedAt: Date
  }],
  completedCases: [{
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case"
    },
    success: Boolean,
    completedAt: Date
  }],
  npcRelationships: [{
    npcId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NPC"
    },
    trustLevel: Number,
    lastInteraction: Date
  }],
  achievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Achievement"
  }],
  friends: [{
    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    status: {
      type: String,
      enum: ['pendente', 'confirmado'],
      default: 'pendente'
    },
    friendshipDate: {
      type: Date,
      default: Date.now
    }
  }],
  blocklist: [{
    blockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blockList"
    },
    blockdate: {
      type: Date,
      default: Date.now
    }
  }],
  lastLogin: Date,
  isOnline: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
