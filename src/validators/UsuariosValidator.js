const Joi = require('@hapi/joi');

class UsuariosValidator {

  static validateObtainUser() {
    const schema = Joi.object().keys({
      key: Joi.required(), 
      idPersona: Joi.required(),
      numeroDocumento: Joi.string().required(),      
    });
    return schema;
  }

  static validateLoginUser() {
    const schema = Joi.object().keys({    
      key: Joi.required(), 
      nomUsuario: Joi.string().required(),
      passUsuario: Joi.string().required(),
    });
    return schema;
  }

  static validateCreateUser() {
    const schema = Joi.object().keys({      
      primerNombre: Joi.string().required(),
      segudoNombre: Joi.string().required(),
      primerApellido: Joi.string().required(),
      segundoApellido: Joi.string().required(),
      tipoDocumento: Joi.string().required(),
      numeroDocumento: Joi.string().required(),
      fechaNacimiento: Joi.date().required(),
      edad: Joi.required(),
      numeroCelular: Joi.required(),
      direccion: Joi.string().required(),
      genero: Joi.string().required(),      
      nomUsuario: Joi.string().required(),
      passUsuario: Joi.string().required(),
      email: Joi.string().required(),
      origen: Joi.string().required(),       
    });
    return schema;
  }

  static validateUpdateUser() {
    const schema = Joi.object().keys({
      idPersona: Joi.required(),
      primerNombre: Joi.string().required(),
      segudoNombre: Joi.string().required(),
      primerApellido: Joi.string().required(),
      segundoApellido: Joi.string().required(),
      tipoDocumento: Joi.required(),
      numeroDocumento: Joi.string().required(),
      fechaNacimiento: Joi.date().required(),
      numeroCelular: Joi.required(),
      direccion: Joi.string().required(),
      genero: Joi.required(),
      nomUsuario: Joi.string().required(),
      email: Joi.string().required(),
      estadoUsuario: Joi.required(),
    });
    return schema;
  }

  static validateDeleteUser(){
    const schema = Joi.object().keys({     
      idPersona: Joi.required(),
      nomUsuario: Joi.string().required(),      
    });
    return schema;
  }

  static validateChangeUserStatus(){
    const schema = Joi.object().keys({
      idPersona: Joi.required(),
      idEstado: Joi.required(),
    });
    return schema;
  }

}

module.exports = UsuariosValidator;