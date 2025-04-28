const mongoose = require('mongoose');

const npcSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true 
},

  role: { 
    type: String, 
    required: true 
},

  description: String,
  avatar: String,
  dialogues: [String],

  trustLevel: { 
    type: Number, 
    default: 0 
}

});

module.exports = mongoose.model('NPC', npcSchema);