const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ocurrióo un error interno", error: error });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    return user
      ? res.status(200).json(user)
      : res.status(400).json({ message: "Usuario no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un error interno", error: error });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password, email, avatarURL } = req.body;

    const newUser = new User({
      username,
      password,
      email,
      avatarURL,
    });
    const savedUser = await newUser.save();
    return savedUser
      ? res.status(200).json({ message: "Usuario creado con exito" })
      : res.status(400).json({ message: "El usuario no se pudo crear" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ocurrióo un error interno", error: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, username, password, email, avatarURL } = req.body;

    await User.findByIdAndUpdate(id, {
      username: username,
      password: password,
      email: email,
      avatarURL: avatarURL,
    });

    return res.json({ message: "Usuario actualizado con exito" });
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un error interno", error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    await User.findByIdAndDelete(id);

    return res.json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un error interno", error: error });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
