const {AwsUtils} = require('lib-commons/helpers');
const DocumentoDb = require('../db/DocumentoDb');


class DocumentoService {

    static async obtenerTipoDocumento(event) {
        // const payload = AwsUtils.getPayloadRequest(event);
        // const trace = AwsUtils.getTraceRequest(event);    
        const result = await DocumentoDb.obtenerTipoDocumento(event);
        
        return result;
    }
}

module.exports = DocumentoService;