const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email",
      });
    }

    // Verify password
    const isIdentified = await user.comparePassword(password);
    if (!isIdentified) {
      return res.status(400).json({
        status: "error",
        message: "Invalid password",
      });
    }

    // Generate token
    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        roles: user.roles,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response
    res.status(200).json({
      status: "success",
      user: { email: user.email, _id: user._id, roles: user.roles },
      accessToken,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      status: "error",
      message: "Login failed",
    });
  }
};

module.exports = loginController;
