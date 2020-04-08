const {AwsUtils} = require('lib-commons/helpers');

class UsuariosService {

    static async obtenerUsuario(event) {
        const payload = AwsUtils.getPayloadRequest(event);
        const respuesta = {
            name: "AAAAA",
            fullName: "AAAAAAA AAAAAAAA"
        };
        return respuesta;
    }
}

module.exports = UsuariosService;
