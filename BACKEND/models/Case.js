const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['Aberto', 'Em andamento', 'Resolvido'], default: 'Aberto' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  relatedEntities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ent' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports = mongoose.model('Case', caseSchema);
