const { isAuth, isAdmin } = require('../../middlewares/auth');
const upload = require('../../middlewares/file');
const {
  getAllProducts,
  getProductByid,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByPrice,
  getProductsByCategory,
  addToFavorite,
} = require('../controller/product');

const productsRoutes = require('express').Router();

productsRoutes.get('/', getAllProducts);
productsRoutes.get("/categories/:categories", getProductsByCategory);
productsRoutes.get("/price/:price", getProductsByPrice);
productsRoutes.get('/:id', getProductByid);
productsRoutes.post('/', [isAuth], upload.single('image'), createProduct);
productsRoutes.post('/:id/favorites', [isAuth], addToFavorite);
productsRoutes.put('/:id',  [isAuth , isAdmin], upload.single('image'), updateProduct);
productsRoutes.delete('/:id',  [isAuth , isAdmin], deleteProduct);

module.exports = productsRoutes;
