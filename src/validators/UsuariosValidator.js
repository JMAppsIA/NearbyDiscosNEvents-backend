const Joi = require('@hapi/joi');

class UsuariosValidator {

  static validateObtainUser() {
    const schema = Joi.object().keys({
      numeroDocumento: Joi.string().required(),      
    });
    return schema;
  }

  static validateCreateUser() {
    const schema = Joi.object().keys({
      firstName: Joi.string().required(),
      secondName: Joi.string().required(),
      firstLastName: Joi.string().required(),
      secondLastName: Joi.string().required(),
      tipoDocumento: Joi.string().required(),
      numeroDocumento: Joi.string().required(),
      fechaNacimiento: Joi.date().required(),
      edad: Joi.required(),
      mobileNumber: Joi.required(),
      address: Joi.string().required(),
      genre: Joi.string().required(),
    });
    return schema;
  }

  static validateUpdateUser() {
    const schema = Joi.object().keys({
      firstName: Joi.string(),
      secondName: Joi.string(),
      firstLastName: Joi.string(),
      secondLastName: Joi.string(),
      tipoDocumento: Joi.string(),
      numeroDocumento: Joi.string().required(),
      fechaNacimiento: Joi.date(),
      edad: Joi.string(),
      mobileNumber: Joi.string(),
      address: Joi.string(),
      genre: Joi.string(),
    });
    return schema;
  }

  static validateDeleteUser(){
    const schema = Joi.object().keys({
      numeroDocumento: Joi.string().required(),      
    });
    return schema;
  }

}

module.exports = UsuariosValidator;