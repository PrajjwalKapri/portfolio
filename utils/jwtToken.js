export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "PRODUCTION", // Ensure the cookie is sent only over HTTPS in production
      sameSite: "none", // Ensure cookies are sent in cross-domain contexts
    })

    .json({
      success: true,
      message,
      user,
      token,
    });
};
