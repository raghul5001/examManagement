const Joi = require("joi");

const subjectSchema = Joi.object({
  subjectName: Joi.string().required(),

});

const validateSubject = (req, res, next) => {
  const { error } = subjectSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    return res.status(400).json({ error: errorMessage });
  }
  next();
};

module.exports = {validateSubject};