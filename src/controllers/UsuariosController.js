const UsuariosService = require('../services/UsuariosService');
const UsuariosValidator = require('../validators/UsuariosValidator');
const { AwsUtils, LoggerUtils } = require('lib-commons/helpers');
const { AppValidator } = require('lib-commons/validations');

class UsuariosController {

    static async obtenerUsuario(event) {
        try {
          await AppValidator.validateRequest(event, UsuariosValidator.validateObtainUser());
          const result = await UsuariosService.obtenerUsuario(event);
          return AwsUtils.buildResponse(event, result);
        } catch (error) {
          LoggerUtils.error(error);
          return AwsUtils.buildErrorResponse(event, error);
        }
      }

}

module.exports = UsuariosController;
