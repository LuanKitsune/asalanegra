const mongoose = require('mongoose');

const dangerLevelSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["Sussurro", "Aparição", "Flagelo", "Calamidade", "Cataclismo", "Divino"],
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  icon: String,
  colorCode: String 
});

module.exports = mongoose.model('dangerLevel', dangerLevelSchema);

module.exports = dangerLevel;