require('dotenv').config();
const jwt = require('jsonwebtoken');

// Middleware untuk mengecek apakah user terautentikasi
exports.requireAuth = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.redirect('/user/login');
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // menyimpan user info di req.user
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    res.clearCookie('auth_token'); // hapus cookie jika token tidak valid
    return res.redirect('/user/login');
  }
};

// Middleware untuk sign out / logout
exports.signOut = (req, res, next) => {
  res.clearCookie('auth_token', { path: '/' });
  console.log("User logged out successfully");
  res.redirect('/user/login'); // redirect langsung ke login page
};
