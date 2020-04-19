const LocalService = require('../services/LocalService');
const LocalValidator = require('../validators/LocalValidator');
const { AwsUtils, LoggerUtils } = require('lib-commons/helpers');
const { AppValidator } = require('lib-commons/validations');

class LocalController {

    static async obtenerLocales(event) {
        try {
          await AppValidator.validateRequest(event, LocalValidator.validateObtainLocal());

          const result = await LocalService.obtenerLocales(event);
          return AwsUtils.buildResponse(event, result);
        } catch (error) {
          LoggerUtils.error(error);
          return AwsUtils.buildErrorResponse(event, error);
        }
      }
}

module.exports = LocalController