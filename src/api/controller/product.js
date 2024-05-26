const { setError } = require('../../config/error');
const { deleteFile } = require('../../util/deleteFile');
const Product = require('../model/product');
const User = require('../model/user');

const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    return res.status(200).json(allProducts);
  } catch (error) {
    return next(setError(400, "can't find products 😱"));
  }
};

const getProductByid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (error) {
    return next(setError(400, "can't find product 😱"));
  }
};

const getProductsByCategory = async (req, res, next) => {
  try {
    const { categories } = req.params;
    const products = await Product.find({ categories });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json("Error en la solicitud");
  }
};

const getProductsByPrice = async (req, res, next) => {
  try {
    const { price } = req.params;
    const products = await Product.find({ price: { $lte: price } });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json("Error en la solicitud");
  }
};

const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    if (req.file) {
      newProduct.image = req.file.path;
    }
    const productBD = await newProduct.save();
    return res.status(201).json(productBD);
  } catch (error) {
    return next(setError(400, "can't create product 😱"));
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldProduct = await Product.findById(id);
    const newProduct = new Product(req.body);

    if (req.file) {
      // Cambiar 'product_images' a cualquier otra carpeta para reutilizar el storage
      const result = await uploadToCloudinary(req.file.path, 'product_images');
      newProduct.image = result.secure_url; // Almacenar la URL segura de la imagen subida
      if (oldProduct.image){
        deleteFile(oldProduct.image);
      }
    }
    newProduct._id = id;

    // Agregar nuevas categorías si se proporcionan, asegurando que sean únicas
    if (newProduct.categories) {
      newProduct.categories = [
        ...new Set([...oldProduct.categories, ...newProduct.categories]),
      ];
    }

    // Actualizar el producto con las nuevas categorías
    const productUpdated = await Product.findByIdAndUpdate(id, newProduct, {
      new: true,
    });
    return res.status(200).json(productUpdated);
  } catch (error) {
    return next(setError(400, "can't update products 😱"));
  }
};

const addToFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Verificar que el producto existe
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Añadir el producto a la lista de favoritos del usuario
    const user = await User.findByIdAndUpdate(userId, {
      $addToSet: { favorites: id } // $addToSet evita duplicados
    }, { new: true }).populate('favorites');

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    return res.status(200).json(deleteProduct);
  } catch (error) {
    return next(setError(400, "can't delete products 😱"));
  }
};

module.exports = {
  getAllProducts,
  getProductByid,
  getProductsByCategory,
  getProductsByPrice,
  createProduct,
  updateProduct,
  addToFavorite,
  deleteProduct,
};
