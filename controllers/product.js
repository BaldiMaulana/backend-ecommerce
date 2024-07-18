const Product = require('../moduls/product')

//handle product baru
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stockQuantity, imageUrl } =
      req.body
    const product = new Product({
      name,
      description,
      price,
      category,
      stockQuantity,
      imageUrl,
    })
    const savedProduct = await product.save()
    res.status(201).json(savedProduct)
  } catch (error) {
    next(error)
  }
}

//handle daftar semua product
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    next(error)
  }
}

//handle detail product by ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).exec();

    if (!product) {
      console.log('Product not found for ID:', productId);
      return res.status(404).json({ error: 'Product not found' });
    }

    console.log('Found product by ID:', product);
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//handle menghapus product ID
exports.deleteProductById = async (req, res, next) => {
  try {
    const productId = req.params.id
    const deletedProduct = await Product.findByIdAndDelete(productId)
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(deletedProduct)
  } catch (error) {
    next(error)
  }
}

//handle memperbarui product berdasarkan ID
exports.updateProductById = async (req, res, next) => {
  try {
    const productId = req.params.id
    const { name, description, price, category, stockQuantity, imageUrl } =
      req.body
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, category, stockQuantity, imageUrl },
      { new: true }
    )
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
}


exports.searchProductsByCategory = async (req, res) => {
  try {
    const { category } = req.query

    // Cari produk berdasarkan kategori
    const products = await Product.find({ category: category })

    res.json(products)
  } catch (error) {
    console.error('Error searching products by category:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
