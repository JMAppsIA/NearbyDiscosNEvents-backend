
const {AwsUtils} = require('lib-commons/helpers');
const LocalDb = require('../db/LocalDb');


class LocalService {

    static async obtenerLocales(event) {
        // const payload = AwsUtils.getPayloadRequest(event);
        // const trace = AwsUtils.getTraceRequest(event);    
        const result = await LocalDb.obtenerLocales(event);
        
        return result;
    }

    static async obtenerCategorias(event) {
        // const payload = AwsUtils.getPayloadRequest(event);
        // const trace = AwsUtils.getTraceRequest(event);    
        const result = await LocalDb.obtenerCategorias(event);
        
        return result;
    }

    


}
module.exports = LocalService;