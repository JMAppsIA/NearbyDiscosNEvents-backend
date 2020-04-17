const Joi = require('@hapi/joi');

class GeneroValidator {

  static validateObtainGenreType() {
    const schema = Joi.object().keys({
      key: Joi.required(),             
    });
    return schema;
  }

}

module.exports = GeneroValidator;