const QueryConstants = require('../constants/QueryConstants');
const DBCloudConnection = require('../db/connection/DBCloudConnection');
const {BusinessError} = require('lib-commons/models')
const { CryptographyUtils } = require('lib-commons/helpers');
const CryptoJS = require('crypto-js');
const {HttpConstants} = require('lib-commons/constants');

class DocumentoDb {

    static async obtenerTipoDocumento(payload) {
        let connection;

        const request = {
          accion: "obtener",
          idPersona: 0,
          primerNombre: "",
          segudoNombre: "",
          primerApellido: "",
          segundoApellido: "",
          nombreCompleto: "",
          tipoDocumento: 0,
          numeroDocumento: "",
          fechaNacimiento: "1900-01-01",
          edad: 0,
          numeroCelular: 0,
          direccion: "",
          genero: "",
          idUsuario: 0, 
          nomUsuario: "",
          passUsuario: "",       
          email: "",
          origen: 0, 
          estadoUsuario: 1,
        }
        
        const source = {
          key: payload.key,
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

            const query = QueryConstants.OBTENER_TIPO_DOCUMENTO;
            connection = await DBCloudConnection.getConnection();
            const result = await DBCloudConnection.executeSQLStatement({
              connection: connection,
              statement: query,
              bindParams: source,
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

module.exports = DocumentoDb