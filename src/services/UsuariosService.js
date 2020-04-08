const AwsUtils = require('../helpers/utils/AwsUtils');

class UsuariosService {
    static async obtenerUsuario(event) {
        const resultado = {
            nombres: "abccc",
            apellidos: "abcde"
        };
        try {                   
                 
            return new Promise(resolve => {
                resolve(resultado);
            });
           
        } catch (error) {
            
        }
        
    }
    static async obtenerUsuario2(event) {
        const payload = AwsUtils.getPayloadRequest(event);
        const respuesta = {
            name: "AAAAA",
            fullName: "AAAAAAA AAAAAAAA"
        };
        return respuesta;
    }
}

module.exports = UsuariosService;
