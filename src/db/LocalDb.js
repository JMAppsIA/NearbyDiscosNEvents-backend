const QueryConstants = require('../constants/QueryConstants');
const DBCloudConnection = require('../db/connection/DBCloudConnection');
const {BusinessError} = require('lib-commons/models')
const { CryptographyUtils } = require('lib-commons/helpers');
const CryptoJS = require('crypto-js');
const {HttpConstants} = require('lib-commons/constants');

class LocalDb {

    static async obtenerLocales(payload) {
        let connection;

        const request = {
            key: 1234,
            accion: "locales/obtener",
            idLocal: 0, 
            nombreLocal: "",
            imagenLocal: "",
            precioLocal: 0.00, 
            latitudLocal: 0.00, 
            longitudLocal: 0.00,
            descripcionLocal: "", 
            numeroLocal: 1234556, 
            direccionLocal: "",
            estadoLocal: 2, 
            rankingLocal: 0.0
        }
        
        const source = {
            key: payload.key,
            accion: request.accion,
            idLocal: request.idLocal, 
            nombreLocal: request.nombreLocal,
            imagenLocal: request.imagenLocal,
            precioLocal: request.precioLocal, 
            latitudLocal: request.latitudLocal, 
            longitudLocal: request.longitudLocal,
            descripcionLocal: request.descripcionLocal, 
            telefonoLocal: request.telefonoLocal, 
            direccionLocal: request.direccionLocal,
            estadoLocal: payload.estadoLocal, 
            rankingLocal: request.rankingLocal
        };

        const target = {
            idLocal: null,
            nombreLocal: null,
            imagenLocal: null,
            precioLocal: null,
            latitudLocal: null,
            longitudLocal: null,
            descripcionLocal: null,
            telefonoLocal:null,
            direccionLocal: null,
            estadoLocal: null,
            rankingLocal: null,         
      };

      const response = {
        httpCode:200,
        status:false,
        message: null
      };

        try {
          if(payload.key != process.env.API_KEY){ 

            response.httpCode = HttpConstants.BAD_REQUEST_STATUS.code;
            response.status = false;
            response.message = "Campo Key es invalido";
    
          } else {

            const query = QueryConstants.FUNCIONES_LOCAL;
            connection = await DBCloudConnection.getConnection();
            const result = await DBCloudConnection.executeSQLStatement({
              connection: connection,
              statement: query,
              bindParams: source,
              target: target,
            });            
            response.httpCode = HttpConstants.OK_STATUS.code;
            response.status = true;
            response.message = result;

          }
            return response;
          } catch (error) {
            throw new BusinessError({
              code: error.code,
              httpCode: error.httpCode,
              messages: error.messages,
            });
          } finally {
            if (connection) {
              await DBCloudConnection.releaseConnection(connection);
            }
          }
    }

}
module.exports = LocalDb;