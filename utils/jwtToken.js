export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  res
    .status(statusCode)
    .cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days in milliseconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure the cookie is sent over HTTPS in production
      sameSite: "Strict", // Helps prevent CSRF attacks
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
