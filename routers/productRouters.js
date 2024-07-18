const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const logger = require('../helper/logger'); // Impor logger dari file terpisah
const Product = require('../moduls/product'); // Impor model Product yang diperlukan


// Middleware untuk logging setiap permintaan
router.use((req, res, next) => {
  logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  logger.debug(`Request Headers: ${JSON.stringify(req.headers)}`);
  logger.debug(`Request Body: ${JSON.stringify(req.body)}`);
  logger.debug(`Request Parameters: ${JSON.stringify(req.params)}`);
  next();
});

// Rute untuk membuat produk baru
router.post('/products', (req, res) => {
  logger.info('POST request received for creating product:', req.body);
  productController.createProduct(req, res);
});

router.get('/products/search', async (req, res) => {
  try {
    const category = req.query.category;
    logger.info(`Search request received for category: ${category}`);

    // Lakukan pencarian di database menggunakan kategori yang sudah dinormalisasi 
    const products = await Product.find({ category: category }).exec();

    logger.info(`Found products for category: ${category}`);
    res.json(products);
  } catch (error) {
    logger.error('Error searching products by category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Rute untuk mendapatkan daftar semua produk
router.get('/products', (req, res) => {
  logger.info('GET request received for getting all products');
  productController.getAllProducts(req, res);
});

// Rute untuk mendapatkan detail produk berdasarkan ID
router.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId)
    logger.info(`GET request received for getting product by ID: ${productId}`);

    const product = await Product.findById(productId); // Mengambil detail produk dari database berdasarkan ID
    if (!product) {
      logger.warn(`Product with ID ${productId} not found`);
      return res.status(404).json({ error: 'Product not found' });
    }
    logger.info(`Found product with ID ${productId}`);
    res.json(product);
  } catch (error) {
    logger.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Rute untuk menghapus produk berdasarkan ID
router.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
  logger.info(`DELETE request received for deleting product by ID: ${productId}`);

  productController.deleteProductById(req, res);
});

module.exports = router;
