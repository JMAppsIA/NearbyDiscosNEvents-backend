const DocumentoService = require('../services/DocumentoService');
const DocumentoValidator = require('../validators/DocumentoValidator');
const { AwsUtils, LoggerUtils } = require('lib-commons/helpers');
const { AppValidator } = require('lib-commons/validations');

class DocumentoController {

    static async obtenerTipoDocumento(event) {
        try {
          await AppValidator.validateRequest(event, DocumentoValidator.validateObtainDocumentType());
          const result = await DocumentoService.obtenerTipoDocumento(event);
          return AwsUtils.buildResponse(event, result);
        } catch (error) {
          LoggerUtils.error(error);
          return AwsUtils.buildErrorResponse(event, error);
        }
      }

}

module.exports = DocumentoController;
