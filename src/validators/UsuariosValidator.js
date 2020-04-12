const Joi = require('@hapi/joi');

class UsuariosValidator {

  static validateObtainUser() {
    const schema = Joi.object().keys({
      numeroDocumento: Joi.string().required(),      
    });
    return schema;
  }

  static validateLoginUser() {
    const schema = Joi.object().keys({     
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
      accion: Joi.required(),
      idPersona: Joi.required(),
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
      idUsuario: Joi.required(),
      nomUsuario: Joi.string().required(),
      passUsuario: Joi.string().required(),
      email: Joi.string().required(),
      origen: Joi.string().required(), 
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

}

module.exports = UsuariosValidator;