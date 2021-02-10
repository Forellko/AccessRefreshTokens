const generateTokens = require('../utils/getNewTokens');

const onPostRefresh = async (req, res) => {
  /// Добавить проверку в бд рефреш

  res.status(200).json(generateTokens(req.id));
};

module.exports = { onPostRefresh };
