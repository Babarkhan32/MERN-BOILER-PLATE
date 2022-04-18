const Joi = require('joi')

module.exports = {
signup: Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).required()
}),
updateUser: Joi.object({user_id:Joi.string().min(1).required()}),
deleteUser: Joi.object({user_id:Joi.string().min(1).required()})
}