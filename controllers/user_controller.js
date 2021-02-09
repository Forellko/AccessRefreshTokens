const onGetUser = async (req, res) => {
  const currentUser = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  req.body.user = currentUser;
  res.status(200).json(req.body.user);
};

module.exports = { onGetUser };
