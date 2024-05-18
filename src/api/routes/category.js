const {isAuth, isAdmin} = require('../../middlewares/auth');
const upload = require('../../middlewares/file');
const {
  getAllCategories,
  getCategoryByid,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controller/category');

const categoriesRoutes = require('express').Router();

categoriesRoutes.get('/', getAllCategories);
categoriesRoutes.get('/:id', getCategoryByid);
categoriesRoutes.post('/',  [isAuth , isAdmin], upload.single('logo'), createCategory);
categoriesRoutes.put('/:id',  [isAuth , isAdmin], upload.single('logo'), updateCategory);
categoriesRoutes.delete('/:id',  [isAuth , isAdmin], deleteCategory);

module.exports = categoriesRoutes;
