const QueryConstants = require('../constants/QueryConstants');
const DBCloudConnection = require('../db/connection/DBCloudConnection');
const {BusinessError} = require('lib-commons/models')
const { CryptographyUtils } = require('lib-commons/helpers');
const CryptoJS = require('crypto-js');
const {HttpConstants} = require('lib-commons/constants');

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

              const query = QueryConstants.FUNCIONES_USUARIO;
              connection = await DBCloudConnection.getConnection();
              const result = await DBCloudConnection.executeSQLStatement({
                connection: connection,
                statement: query,
                bindParams: source
              });
              
              if(result.affectedRows == 1) {
                  response.httpCode = HttpConstants.OK_STATUS.code;
                  response.status = true;
                  response.message = "Se creo el usuario";                               
              } else {
                  response.httpCode = HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code;
                  response.status = true;
                  response.message = "No se pudo crear el usuario";
              }

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
        fechaNacimiento: "1900-01-01",
        edad: 0,
        numeroCelular: 0,
        direccion: "",
        genero: 0,
        idUsuario: 0, 
        nomUsuario: "",
        passUsuario: "",       
        email: "",
        origen: 0, 
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

        const query = QueryConstants.FUNCIONES_USUARIO;
        connection = await DBCloudConnection.getConnection();
        const result = await DBCloudConnection.executeSQLStatement({
          connection: connection,
          statement: query,
          bindParams: source        
        });
    
        console.log("result ",result[0][0]);
  
        if(result[0][0]) {

           if(result[0][0].statudID == 7) {
              response.httpCode = 200;
              response.status = true;
              response.message = "El usuario se encuentra inactivo";
            
            } else {
              response.httpCode = 200;
              response.status = true;
              response.message = result[0];
              
            }
        } else {

          response.httpCode = HttpConstants.OK_STATUS.code;
          response.status = true;
          response.message = [target];
        }         
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

    static async obtenerUsuario(payload) {
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
          genero: 0,
          idUsuario: 0, 
          nomUsuario: "",
          passUsuario: "",       
          email: "",
          origen: 0, 
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
          numeroDocumento: payload.numeroDocumento,
          fechaNacimiento: request.fechaNacimiento,
          edad: request.edad,
          numeroCelular: request.numeroCelular,
          direccion: request.direccion,
          genero: request.genero,
          idUsuario: request.idUsuario,
          nomUsuario: request.nomUsuario,
          passUsuario: request.passUsuario,
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

            const query = QueryConstants.FUNCIONES_USUARIO;
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

    static async actualizarUsuario(payload) {
        let connection;
        const fullName = payload.primerNombre.concat(" ").
        concat(payload.segudoNombre).concat(" ").
        concat(payload.primerApellido).concat(" ").
        concat(payload.segundoApellido);  

        const request = {
          accion: "datos/actualizar",
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
          genero: 0,
          idUsuario: 0, 
          nomUsuario: "",
          passUsuario: "",       
          email: "",
          origen: 0, 
          estadoUsuario: 1,
        }

        const source = {
          accion: request.accion,
          idPersona: payload.idPersona,
          primerNombre: payload.primerNombre,
          segudoNombre: payload.segudoNombre,
          primerApellido: payload.primerApellido,
          segundoApellido: payload.segundoApellido,
          nombreCompleto: fullName,
          tipoDocumento: payload.tipoDocumento,
          numeroDocumento: payload.numeroDocumento,
          fechaNacimiento: payload.fechaNacimiento,
          edad: request.edad,
          numeroCelular: payload.numeroCelular,
          direccion: payload.direccion,
          genero: payload.genero,
          idUsuario: request.idUsuario, 
          nomUsuario: payload.nomUsuario,
          passUsuario: request.passUsuario, 
          email: payload.email,
          origen: request.origen, 
          estadoUsuario: payload.estadoUsuario,
        };
        const target = {
            message: "Usuario actualizado correctamente!",
        }
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

            const query = QueryConstants.FUNCIONES_USUARIO;
            connection = await DBCloudConnection.getConnection();
            const result = await DBCloudConnection.executeSQLStatement({
              connection: connection,
              statement: query,
              bindParams: source,
            });
            

            if(result.affectedRows >= 1) {
              response.httpCode = HttpConstants.OK_STATUS.code;
              response.status = true;
              response.message = "Se actualizo el usuario correctamente";
            } else {
              response.httpCode = HttpConstants.OK_STATUS.code;
              response.status = false;              
              response.message = `Usuario con documento ${payload.numeroDocumento} no existe.`;
            }

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
        fechaNacimiento: "1900-01-01",
        edad: 0,
        numeroCelular: 0,
        direccion: "",
        genero: 0,
        idUsuario: 0, 
        passUsuario: "",       
        email: "",
        origen: 0, 
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

            const query = QueryConstants.FUNCIONES_USUARIO;
            connection = await DBCloudConnection.getConnection();
            const result = await DBCloudConnection.executeSQLStatement({
              connection: connection,
              statement: query,
              bindParams: source,              
              // target: target,
            });

            if(result.affectedRows >= 1) {
              response.httpCode = HttpConstants.OK_STATUS.code;
              response.status = true;
              response.message = "Se elimino el usuario";                                 
            } else {
              response.httpCode = HttpConstants.OK_STATUS.code;
              response.status = true;
              response.message = `Usuario con id ${payload.idPersona} no existe.`;
            }

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

    static async cambiarEstadoUsuario(payload) {
      let connection;  

      const request = {
        accion: "estado/cambiar",
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
        genero: 0,
        idUsuario: 0, 
        nomUsuario: "",
        passUsuario: "",       
        email: "",
        origen: 0, 
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
        nomUsuario: request.nomUsuario,
        passUsuario: request.passUsuario, 
        email: request.email,
        origen: request.origen, 
        estadoUsuario: payload.idEstado,
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

          const query = QueryConstants.FUNCIONES_USUARIO;
          connection = await DBCloudConnection.getConnection();
          const result = await DBCloudConnection.executeSQLStatement({
            connection: connection,
            statement: query,
            bindParams: source,
          });
          

          if(result.affectedRows >= 1) {
            response.httpCode = HttpConstants.OK_STATUS.code;
            response.status = true;
            response.message = `Estado cambiado correctamente`;                                 
          } else {
            response.httpCode = HttpConstants.OK_STATUS.code;
            response.status = true;
            response.message = `No se pudo cambiar el estado.`;
          }

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

module.exports = UsuarioDb;