const onPostLogin = async (req, res) => {
  const { accessToken, refreshToken } = req.body;
  res.status(200).json({
    accessToken,
    refreshToken,
  });
};

module.exports = { onPostLogin };
