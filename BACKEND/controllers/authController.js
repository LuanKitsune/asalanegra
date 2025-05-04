const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Patent = require("../models/Patent")

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
    const user = await User.findOneAndUpdate({ username }, { $set: { isOnline: true, lastLogin: new Date()}}, { new: true }).populate({path: 'patent', select: 'name'});
    if (!user) {
      return res.status(400).json({ message: "Usuário inválido" });
    }
    if (!user.patent) {
      console.warn('Usuário sem patente válida:', user._id);
      // Pode definir um valor padrão ou tratar como erro
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
        email: user.email,
        status: user.isOnline,
        patent: {
          id: user.patent._id,       // ID da patente
          name: user.patent.name     // Nome da patente
        },
        level: user.level

      }
    });
  } catch (error) {
    console.error("Falha de login", error);
    res.status(500).json({ message: "Desculpe o incoveniente, já vamos resolver o problema" });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(decoded.userId, { 
      $set: { isOnline: false, lastLogout: new Date() } 
    });

    res.status(200).json({ message: "Logout realizado com sucesso" });
    
  } catch (error) {
    console.error("Erro durante logout:", error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Token inválido" });
    }
    
    res.status(500).json({ 
      message: "Erro durante o logout",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};