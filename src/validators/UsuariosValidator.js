const Joi = require('@hapi/joi');

class UsuariosValidator {
  
  static validateObtainUser() {
    const schema = Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    });
    return schema;
  }

}

module.exports = UsuariosValidator;