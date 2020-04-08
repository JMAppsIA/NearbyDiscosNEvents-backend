const UsuariosService = require('../services/UsuariosService');
const BusinessError = require('../models/BusinessError');
const HttpConstants = require('../helpers/constants/HttpConstants');
const ErrorConstants = require('../helpers/constants/ErrorConstants');
const BodyParser = require('body-parser');
const UsuariosValidator = require('../validators/UsuariosValidator');
const AppValidator = require('../helpers/validators/AppValidator');
const AwsUtils = require('../helpers/utils/AwsUtils');
const LoggerUtils = require('../helpers/utils/LoggerUtils');

class UsuariosController {

    static async obtenerUsuario(event) {
        try {
          await AppValidator.validateRequest(event, UsuariosValidator.validateObtainUser2());
          const result = await UsuariosService.obtenerUsuario2(event);
          return AwsUtils.buildResponse(event, result);
        } catch (error) {
          LoggerUtils.error(error);
          return AwsUtils.buildErrorResponse(event, error);
        }
      }

    static async obtenerUsuario2(event) {
        let service = {};
        
        try {             
            
            const validator = UsuariosValidator.validateObtainUser(event);                
            
            validator.then(function(result) {
                
                if(result.error) {                   
                    
                    // response = HttpConstants.buildResponse("",{code: ErrorConstants.REQUEST_BODY_ERROR.code,
                    //     httpCode: HttpConstants.BAD_REQUEST_STATUS.code,
                    //     messages: [result.error.details[0].message]},
                    //     false);
                } else {                    
                    service = UsuariosService.obtenerUsuario(event);
                    // response = HttpConstants.buildResponse(service,{},true);
                }
                
                                    
            });

            // return response;
            
        } catch (error) {
            new BusinessError({
                code: ErrorConstants.REQUEST_BODY_ERROR.code,
                httpCode: HttpConstants.BAD_REQUEST_STATUS.code,
                messages: [ErrorConstants.REQUEST_BODY_ERROR.message],
            });
        }
                        
                
    }

}

module.exports = UsuariosController;
