const validateID = (req, res, next) => {
  const id = req.params.id;
  //   if (isNaN(id) || !isFinite(id) || id < 0) {
  //     return res.status(400).json({
  //       status: 'failed',
  //       msg: `Invalid id(${req.params.id})`,
  //     });
  //   }
  console.log(id);
  if (!id) {
    return res.status(400).json({
      status: 'failed',
      msg: `Invalid id(${req.params.id})`,
    });
  }

  next();
};

module.exports = validateID;
