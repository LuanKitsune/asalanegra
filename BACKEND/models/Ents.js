const mongoose = require("mongoose");

const entSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    
    type: { 
      type: String, 
      enum: ["Criatura", "Maldição", "Lugar", "Artefato"],
      required: true 
    },
    
    category: { 
      type: String, 
      enum: ["Folclore", "Lenda Urbana", "Creppypasta", "Outros"],
      required: true 
    },
  
    description: {
       type: String, 
       required: true 
    },

    origin: String,
    characteristics: [String],
    weaknesses: [String],
  
    dangerLevel: {
      type: String,
      ref: 'dangerLevel',
      required: true
    },
      
    // Mídia
    images: [String],  // URLs de imagens relacionadas
  
    // Relacionamentos
    relatedEntities: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entity"
    }],  // Outras entidades relacionadas
  
    // Controle de acesso
    isClassified: { type: Boolean, default: false },  // Se é informação secreta
    classificationLevel: { type: Number, min: 1, max: 5 }  // Nível de classificação (1-5)
  });