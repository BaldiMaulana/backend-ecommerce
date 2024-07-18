const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stockQuantity: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Tambahkan properti lain sesuai kebutuhan aplikasi Anda
  // Contoh properti tambahan: brand, rating, dll.
  brand: {
    type: String
  },
  rating: {
    type: Number
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
