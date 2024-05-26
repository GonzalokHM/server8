const { isAuth, isAdmin } = require('../../middlewares/auth');
const upload = require('../../middlewares/file');
const { register, login, updateUser, deleteUser, getUsers, updateUserRole } = require('../controller/user');
  
  const userRoutes = require('express').Router();
  userRoutes.get("/", [isAuth , isAdmin], getUsers);
  userRoutes.post('/register', register);
  userRoutes.post('/login', login);
  userRoutes.put('/auth/avatar', [isAuth], upload.single('avatar'),updateUser);
  userRoutes.put('/auth/:id', [isAuth , isAdmin],updateUserRole);
  userRoutes.delete('/auth/:id', [isAuth, isAdmin], deleteUser);
  
  module.exports = userRoutes;
