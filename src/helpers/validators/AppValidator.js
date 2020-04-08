const Joi = require('@hapi/joi');

const Logger = require('../utils/LoggerUtils');
const ErrorConstants = require('../constants/ErrorConstants');
const HttpConstants = require('../constants/HttpConstants');
const BusinessError = require('../../models/BusinessError');
const validationMessages = require('./validation-messages.json');
const AwsUtils = require('../utils/AwsUtils');

class AppValidator {
  static async validateRequest(event, schema) {
    this._validateBody(event);
    this._validateTrace(event);
    this._addTrace(event);

    if (schema) {
      const payload = AwsUtils.getPayloadRequest(event);
      this._validate(schema, payload);
    }
  }

  static _validateBody(event) {
    const request = AwsUtils.getRequest(event);
    if (!request || !request.trace || !request.payload) {
      throw new BusinessError({
        code: ErrorConstants.REQUEST_BODY_ERROR.code,
        httpCode: HttpConstants.BAD_REQUEST_STATUS.code,
        messages: [ErrorConstants.REQUEST_BODY_ERROR.message],
      });
    }
  }

  static _validateTrace(event) {
    const trace = AwsUtils.getTraceRequest(event);
    const schema = Joi.object().keys({
      consumerId: Joi.string().trim().label('consumerId').required(),
      channelCode: Joi.string().trim().label('channelCode').required(),
    });

    try {
      this._validate(schema, trace);
    } catch (error) {
      Logger.error(error);
      throw new BusinessError({
        code: ErrorConstants.REQUEST_BODY_ERROR.code,
        httpCode: error.httpCode,
        messages: error.messages,
      });
    }
  }

  static _addTrace(event) {
    if (process.env.TRACING === 'true') {
      AwsUtils.addTrace(event);
    }
  }

  static _validate(schema, payload) {
    const validation = schema.validate(payload, {
      allowUnknown: true,
      abortEarly: false,
      language: validationMessages,
    });

    if (validation.error) {
      const messagesError = [];
      validation.error.details.forEach((value) => {
        messagesError.push(value.message);
      });

      throw new BusinessError({
        code: ErrorConstants.VALIDATION_ERROR.code,
        httpCode: HttpConstants.BAD_REQUEST_STATUS.code,
        messages: messagesError,
      });
    }
  }
}

module.exports = AppValidator;
