const Joi = require('@hapi/joi');

class LocalValidator {

  static validateObtainLocal() {
    const schema = Joi.object().keys({
      key: Joi.required(), 
      estadoLocal: Joi.required(),     
    });
    return schema;
  }

}

module.exports = LocalValidator