var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  category: String

}, {
  collection: 'product' // Specify the collection name here
});

module.exports = mongoose.model('Product', ProductSchema)