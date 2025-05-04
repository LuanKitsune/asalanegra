const User = require('../models/User');

let statsCache = null;
let lastUpdate = null;

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId, 
      req.body, 
      { new: true, select: '-password' }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserStatistics = async (req, res) => {
  try {
    if (!statsCache || Date.now() - lastUpdate > 300000) {
      const totalUsers = await User.countDocuments();
      const onlineUsers = await User.countDocuments({ isOnline: true });

      statsCache = {
        totalUsers,
        onlineUsers
      };
      lastUpdate = Date.now();
    }

    res.json({
      success: true,
      data: statsCache
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Não foi possível obter estatísticas de usuários',
      error: error.message
    });
  }
};