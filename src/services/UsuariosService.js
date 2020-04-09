const {AwsUtils} = require('lib-commons/helpers');
const UsuarioDb = require('../db/UsuarioDb');


class UsuariosService {

    static async obtenerUsuario(event) {
        const payload = AwsUtils.getPayloadRequest(event);
        const trace = AwsUtils.getTraceRequest(event);    
        const result = await UsuarioDb.obtenerUsuario(payload);
        console.log("result -> ", result);
        
        return result;
    }

    static async crearUsuario(event) {
        const payload = AwsUtils.getPayloadRequest(event);
        const trace = AwsUtils.getTraceRequest(event);    
        const result = await UsuarioDb.crearUsuario(payload);
        console.log("result -> ", result);
        
        return result;
    }

    static async actualizarUsuario(event) {
        const payload = AwsUtils.getPayloadRequest(event);
        const trace = AwsUtils.getTraceRequest(event);    
        const result = await UsuarioDb.actualizarUsuario(payload);
        console.log("result -> ", result);
        
        return result;
    }

    static async eliminarUsuario(event) {
        const payload = AwsUtils.getPayloadRequest(event);
        const trace = AwsUtils.getTraceRequest(event);    
        const result = await UsuarioDb.eliminarUsuario(payload);
        console.log("result -> ", result);
        
        return result;
    }
    
}

module.exports = UsuariosService;
