const mongoose = require('mongoose');

const { Schema } = mongoose;

const artSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Art = mongoose.model('Art', artSchema);

module.exports = Art;

//  'Art', 'artPieces'