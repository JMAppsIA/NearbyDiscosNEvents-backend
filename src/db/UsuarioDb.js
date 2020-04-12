const QueryConstants = require('../constants/QueryConstants');
const DBCloudConnection = require('../db/connection/DBCloudConnection');
const {BusinessError} = require('lib-commons/models')
const { CryptographyUtils } = require('lib-commons/helpers');
const CryptoJS = require('crypto-js');

class UsuarioDb {
    
    static async crearUsuario(payload) {
        let connection;
        const fullName = payload.primerNombre.concat(" ").concat(payload.segudoNombre).concat(" ").concat(payload.primerApellido).concat(" ").concat(payload.segundoApellido);
        // const pwdStr = payload.passUsuario;
        // const password = CryptoJS.SHA384(pwdStr);
        const source = {
          accion: "registrar",
          idPersona: 0,
          primerNombre: payload.primerNombre,
          segudoNombre: payload.segudoNombre,
          primerApellido: payload.primerApellido,
          segundoApellido: payload.segundoApellido,
          nombreCompleto: fullName,
          tipoDocumento: payload.tipoDocumento,
          numeroDocumento: payload.numeroDocumento,
          fechaNacimiento: payload.fechaNacimiento,
          edad: payload.edad,
          numeroCelular: payload.numeroCelular,
          direccion: payload.direccion,
          genero: payload.genero,
          idUsuario: 0,
          nomUsuario: payload.nomUsuario,
          passUsuario: payload.passUsuario,
          email: payload.email,
          origen: payload.origen, 
          estadoUsuario: 1,
        };
        const target = {
            message: null,
        }
        try {
            const query = QueryConstants.FUNCIONES_USUARIO;
            connection = await DBCloudConnection.getConnection();
            const result = await DBCloudConnection.executeSQLStatement({
              connection: connection,
              statement: query,
              bindParams: source
            });
            
            console.log("result ---->>>> ", result);
            
            
            if(result.affectedRows == 1) {
                target.message = "Se creo el usuario";                                 
            } else {
                target.message = "No se pudo crear el usuario";
            }
            
            return target;
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

    static async logueaUsuario(payload) {
      let connection;
      //const password = CryptographyUtils.encryptAES(process.env.SHA_KEY, `${payload.passUsuario}`);
      const password = CryptoJS.SHA384(payload.passUsuario);
      
      const request = {
        accion: "login",
        idPersona: 0,
        primerNombre: "",
        segudoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        nombreCompleto: "",
        tipoDocumento: 0,
        numeroDocumento: "",
        fechaNacimiento: "0000-00-00",
        edad: 0,
        numeroCelular: 0,
        direccion: "",
        genero: "",
        idUsuario: 0, 
        passUsuario: "",       
        email: "",
        origen: "", 
        estadoUsuario: 1,
      }



      const source = {
        accion: request.accion,
        idPersona: request.idPersona,
        primerNombre: request.primerNombre,
        segudoNombre: request.segudoNombre,
        primerApellido: request.primerApellido,
        segundoApellido: request.segundoApellido,
        nombreCompleto: request.nombreCompleto,
        tipoDocumento: request.tipoDocumento,
        numeroDocumento: request.numeroDocumento,
        fechaNacimiento: request.fechaNacimiento,
        edad: request.edad,
        numeroCelular: request.numeroCelular,
        direccion: request.direccion,
        genero: request.genero,
        idUsuario: request.idUsuario,
        nomUsuario: payload.nomUsuario,
        passUsuario: payload.passUsuario,
        email: request.email,
        origen: request.origen, 
        estadoUsuario: request.estadoUsuario,
      };

    const target = {
      personId: null,
      firstName: null,
      secondName: null,
      firstLastName: null,
      secondLastName: null,
      fullName: null,
      documentType: null,
      documentNumber:null,
      bornDate: null,
      address: null,
      genre: null,
      userName: null,
      email: null,
      mobileNumber: null,
      userStatus: null,
  }
  try {
      const query = QueryConstants.FUNCIONES_USUARIO;
      connection = await DBCloudConnection.getConnection();
      const result = await DBCloudConnection.executeSQLStatement({
        connection: connection,
        statement: query,
        bindParams: source,
        target: target
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
            id_per: null,
            pri_nomb: null,
        }
        try {
            const query = QueryConstants.FUNCIONES_USUARIO;
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

    static async eliminarUsuario(payload) {
      let connection;        
      const request = {
        accion: "eliminar",
        primerNombre: "",
        segudoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        nombreCompleto: "",
        tipoDocumento: 0,
        numeroDocumento: "",
        fechaNacimiento: "0000-00-00",
        edad: 0,
        numeroCelular: 0,
        direccion: "",
        genero: "",
        idUsuario: 0, 
        passUsuario: "",       
        email: "",
        origen: "", 
        estadoUsuario: 1,
      }


      const source = {
        accion: request.accion,
        idPersona: payload.idPersona,
        primerNombre: request.primerNombre,
        segudoNombre: request.segudoNombre,
        primerApellido: request.primerApellido,
        segundoApellido: request.segundoApellido,
        nombreCompleto: request.nombreCompleto,
        tipoDocumento: request.tipoDocumento,
        numeroDocumento: request.numeroDocumento,
        fechaNacimiento: request.fechaNacimiento,
        edad: request.edad,
        numeroCelular: request.numeroCelular,
        direccion: request.direccion,
        genero: request.genero,
        idUsuario: request.idUsuario,
        nomUsuario: payload.nomUsuario,
        passUsuario: request.passUsuario,
        email: request.email,
        origen: request.origen, 
        estadoUsuario: request.estadoUsuario,
      };

        const target = {
            message: null,
        }
        try {
            const query = QueryConstants.FUNCIONES_USUARIO;
            connection = await DBCloudConnection.getConnection();
            const result = await DBCloudConnection.executeSQLStatement({
              connection: connection,
              statement: query,
              bindParams: source,              
              // target: target,
            });

            if(result.affectedRows >= 1) {
                target.message = "Se elimino el usuario";                                 
            } else {
                target.message = `Usuario con id ${payload.idPersona} no existe.`;
            }
            
            return target;
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