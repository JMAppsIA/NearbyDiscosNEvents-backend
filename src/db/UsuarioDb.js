const QueryConstants = require('../constants/QueryConstants');
const DBCloudConnection = require('../db/connection/DBCloudConnection');
const {BusinessError} = require('lib-commons/models')

class UsuarioDb {
    
    static async crearUsuario(payload) {
        let connection;
        const fullName = payload.firstName.concat(" ").concat(payload.secondName).concat(" ").concat(payload.firstLastName).concat(" ").concat(payload.secondLastName);
        const source = {
            pri_nomb: payload.firstName,
            seg_nomb: payload.secondName,
            pri_apel: payload.firstLastName,
            seg_apel: payload.secondLastName,
            nom_comp: fullName,
            tip_doc: payload.tipoDocumento,
            num_doc: payload.numeroDocumento,
            fec_nac: payload.fechaNacimiento,
            edad: payload.edad,
            telf: payload.mobileNumber,
            direc_per: payload.address,
            genero_per: payload.genre,
        };
        const target = {
            message: "Usuario registrado correctamente!",
        }
        try {
            const query = QueryConstants.CREAR_USUARIO;
            connection = await DBCloudConnection.getConnection();
            const result = await DBCloudConnection.executeSQLStatement({
              connection: connection,
              statement: query,
              bindParams: source,
              target: target,
            });
            return result;
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

    static async obtenerUsuario(payload) {
        let connection;
        
        const source = {
            numeroDocumento: payload.numeroDocumento,
        };
        const target = {
            pri_nomb: null,
        }
        try {
            const query = QueryConstants.OBTENER_USUARIO;
            connection = await DBCloudConnection.getConnection();
            const result = await DBCloudConnection.executeSQLStatement({
              connection: connection,
              statement: query,
              bindParams: source,
              target: target,
            });
            return result;
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

    static async actualizarUsuario(payload) {
        let connection;
        const fullName = payload.firstName.concat(" ").concat(payload.secondName).concat(" ").concat(payload.firstLastName).concat(" ").concat(payload.secondLastName);  
        const source = {
            pri_nomb: payload.firstName,
            seg_nomb: payload.secondName,
            pri_apel: payload.firstLastName,
            seg_apel: payload.secondLastName,
            nom_comp: fullName,
            tip_doc: payload.tipoDocumento,
            num_doc: payload.numeroDocumento,
            fec_nac: payload.fechaNacimiento,
            edad: payload.edad,
            telf: payload.mobileNumber,
            direc_per: payload.address,
            genero_per: payload.genre,
        };
        const target = {
            message: "Usuario actualizado correctamente!",
        }
        try {
            const query = QueryConstants.ACTUALIZAR_USUARIO;
            connection = await DBCloudConnection.getConnection();
            const result = await DBCloudConnection.executeSQLStatement({
              connection: connection,
              statement: query,
              bindParams: source,
              target: target,
            });
            return result;
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

module.exports = UsuarioDb;