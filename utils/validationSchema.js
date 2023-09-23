const Joi = require("joi");

exports.login = Joi.object().keys({
 email: Joi.string().email().required().trim(),
 name: Joi.string().min(3).required().trim(),
 photo: Joi.string()
});