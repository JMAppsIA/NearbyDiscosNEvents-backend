const GeneroService = require('../services/GeneroService');
const GeneroValidator = require('../validators/GeneroValidator');
const { AwsUtils, LoggerUtils } = require('lib-commons/helpers');
const { AppValidator } = require('lib-commons/validations');

class GeneroController {

    static async obtenerTipoGenero(event) {
        try {
          await AppValidator.validateRequest(event, GeneroValidator.validateObtainGenreType());
          const result = await GeneroService.obtenerTipoGenero(event);
          return AwsUtils.buildResponse(event, result);
        } catch (error) {
          LoggerUtils.error(error);
          return AwsUtils.buildErrorResponse(event, error); //gg
        }
      }

}

module.exports = GeneroController;
