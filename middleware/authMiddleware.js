exports.requireAuth = (req, res, next) => {
  const token = req.cookies.auth_token;
    if (!token) {
      return res.redirect('/login');
    }
    next();
  };

exports.signOut = (req, res, next) => {
  res.cookie('auth_token', '', { path: '/', maxAge: 0 });

  console.log("Logged out successfully!");
  next();
  };
