const mongoose = require("mongoose");

const patentSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  }
  
},{
collection: 'Patent'
});

const Patent = mongoose.model("Patent", patentSchema);

module.exports = Patent;
