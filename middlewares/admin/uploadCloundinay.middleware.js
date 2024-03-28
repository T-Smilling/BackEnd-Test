const uploadToCloudinary = require("../../helper/cloudDinary");

module.exports.uploadSingle = async (req, res, next) => {
  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer);
    req.body[req.file.fieldname] = result;
  }

  next();
};