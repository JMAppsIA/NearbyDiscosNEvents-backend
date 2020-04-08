const Joi = require('@hapi/joi');

class UsuariosValidator {

  static async validateObtainUser(req) {
    
    
    const schema = Joi.object().keys({
      username: Joi.string().alphanum().min(6).max(16).required(),
      password: Joi.string().required()
    }).with('username', 'password');  
    
    const validation = schema.validate(req.body);
    
     return validation;
  }

  static validateObtainUser2() {
    const schema = Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    });
    return schema;
  }

}

module.exports = UsuariosValidator;