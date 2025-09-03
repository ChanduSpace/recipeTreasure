const logoutController = async (req, res) => {
  try {
    // With stateless JWT, "logout" is handled client-side by discarding the token.
    return res.status(200).json({
      message: "Logout successful. Please remove token on client side.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export default logoutController;
