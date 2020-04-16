const Joi = require('@hapi/joi');

class DocumentoValidator {

  static validateObtainDocumentType() {
    const schema = Joi.object().keys({
      key: Joi.required(),             
    });
    return schema;
  }

}

module.exports = DocumentoValidator;