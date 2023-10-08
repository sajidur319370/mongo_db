module.exports.errorHandler = (error, req, res, next) => {
  res.send(error.message);
};
