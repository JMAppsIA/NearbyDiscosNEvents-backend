const {AwsUtils} = require('lib-commons/helpers');
const GeneroDb = require('../db/GeneroDb');


class GeneroService {

    static async obtenerTipoGenero(event) {
        // const payload = AwsUtils.getPayloadRequest(event);
        // const trace = AwsUtils.getTraceRequest(event);    
        const result = await GeneroDb.obtenerTipoGenero(event);
        
        return result;
    }
}

module.exports = GeneroService;