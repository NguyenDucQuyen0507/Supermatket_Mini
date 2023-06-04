const authFacebook = async (req, res) => {
  // const token = encodedToken(req.user._id);
  // res.setHeader("Authorization", token);
  // return res.status(200).json({ success: true });
  console.log("req user", req.user);
  // Xử lý logic đăng nhập bằng Facebook
};

module.exports = { authFacebook };
