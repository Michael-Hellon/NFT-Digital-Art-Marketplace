const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  pieces: [
    {
      type: Schema.Types.ObjectId,
      ref: 'piece'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
