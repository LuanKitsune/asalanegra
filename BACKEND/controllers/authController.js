const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { namecomplete,username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Erro de cadastro: Email ou senha já existem" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      namecomplete,
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "Conta registrada com sucesso!" });
  } catch (error) {
    console.error("Falha no registro", error);
    res.status(500).json({ message: "OPS! :-( Algo inesperado ocorreu" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Usuário inválido" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Esqueceu sua senha?" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h"
    });
    res.status(200).json({ 
      token,
      user: {
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Falha de login", error);
    res.status(500).json({ message: "Desculpe o incoveniente, já vamos resolver o problema" });
  }
};
