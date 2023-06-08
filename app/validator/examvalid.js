const Joi = require("joi");

const examSchema = Joi.object({
  examName: Joi.string().required()
});

const validateExam = (req, res, next) => {
  const { error } = examSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    return res.status(400).json({ error: errorMessage });
  }
  next();
};

module.exports = {validateExam};
