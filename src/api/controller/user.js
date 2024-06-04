const { setError } = require('../../config/error');
const { generateSign } = require('../../config/jwt');
const { deleteFile } = require('../../util/deleteFile');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const {uploadToCloudinary} = require('../../util/upCloudinary');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return next(setError(400, 'no users found'));
  }
};

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const userDuplicate = await User.findOne({ userName: req.body.userName });

    if (userDuplicate) {
      return next(setError(400, 'this user alredy exists 😱'));
    }
    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (error) {
    return next(setError(400, "can't register 😞"));
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      return next(setError(400, "this doesn't exist 😞"));
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ user, token });
    } else {
      return next(setError(400, "passwords don't macth 😞"));
    }
  } catch (error) {
    return next(setError(400, "can't login 😞"));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const oldUser = await User.findById(userId);

    if (!oldUser) {
      return next(setError(404, 'User not found'));
    }
    
       // Crear un nuevo objeto usuario con los datos antiguos y nuevos
       const newUser = {
        ...oldUser.toObject(), // Copia todos los campos del usuario antiguo
        ...req.body, // Sobrescribe con los campos nuevos
      };


    if (req.file) {
      // Cambiar 'user_avatars' a cualquier otra carpeta para reutilizar el storage
      const result = await uploadToCloudinary(req.file.path, 'users_avatars');
      newUser.avatar = result.secure_url;
      if (oldUser.avatar) {
        deleteFile(oldUser.avatar);
      }
    }

    const userUpdated = await User.findByIdAndUpdate(userId, newUser, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json(userUpdated);
  } catch (error) {
    console.error('Error updating user:', error);
    return next(setError(400, "can't update Users 😱"));
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { newRole } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { rol: newRole },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error actualizando el rol del usuario', error });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    return res.status(200).json(deleteUser);
  } catch (error) {
    return next(setError(400, "can't delete Users 😱"));
  }
};

module.exports = { getUsers, register, login, updateUser, deleteUser,updateUserRole };
