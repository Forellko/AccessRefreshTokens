const onGetUser = async (req, res) => {
  res.status(200).json(req.body.user);
};

module.exports = { onGetUser };
