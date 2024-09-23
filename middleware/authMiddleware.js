const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  console.log(req.header('Authorization'),"------------>")
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

const admin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access Denied. Admins only.' });
  }
  next();
};

module.exports = { auth, admin };
