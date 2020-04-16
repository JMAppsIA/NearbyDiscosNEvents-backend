const {AwsUtils} = require('lib-commons/helpers');
const UsuarioDb = require('../db/UsuarioDb');


class UsuariosService {

    static async obtenerUsuario(event) {
        // const payload = AwsUtils.getPayloadRequest(event);
        // const trace = AwsUtils.getTraceRequest(event);    
        const result = await UsuarioDb.obtenerUsuario(event);
        
        return result;
    }

    static async crearUsuario(event) {
        // const payload = AwsUtils.getPayloadRequest(event);
        // const trace = AwsUtils.getTraceRequest(event);    
        const result = await UsuarioDb.crearUsuario(event);
             
        return result;
    }

    static async logueaUsuario(event) {
        //const payload = AwsUtils.getPayloadRequest(event);
        //const trace = AwsUtils.getTraceRequest(event);    
        const result = await UsuarioDb.logueaUsuario(event);
             
        return result;
    }

    static async actualizarUsuario(event) {
        // const payload = AwsUtils.getPayloadRequest(event);
        // const trace = AwsUtils.getTraceRequest(event);    
        const result = await UsuarioDb.actualizarUsuario(event);       
        
        return result;
    }

    static async eliminarUsuario(event) {
        // const payload = AwsUtils.getPayloadRequest(event);
        // const trace = AwsUtils.getTraceRequest(event);    
        const result = await UsuarioDb.eliminarUsuario(event);
        
        return result;
    }

    static async cambiarEstadoUsuario(event) {
        // const payload = AwsUtils.getPayloadRequest(event);
        // const trace = AwsUtils.getTraceRequest(event);    
        const result = await UsuarioDb.cambiarEstadoUsuario(event);
        
        return result;
    }
    
}

module.exports = UsuariosService;
