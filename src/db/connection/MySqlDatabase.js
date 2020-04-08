const MySqlDb = require('mysql');
const Util = require('util');
// const Logger = require('../../helpers/utils/LoggerUtils');
const BusinessError = require('../../models/BusinessError');
const HttpConstants = require('../../helpers/constants/HttpConstants');
const ObjectMapper = require('../../helpers/mapper/ObjectMapper');
const ErrorConstants = require('../../helpers/constants/ErrorConstants');

class MySqlDatabase {
    static async createPool(dbconfig) {
        const poolConnection = MySqlDb.createPool(dbconfig);
        poolConnection.query = Util.promisify(poolConnection.query);
        poolConnection.end = Util.promisify(poolConnection.end);
        return poolConnection;
    }

    static async closePool(poolConnection) {
        try {
          if (poolConnection) {
            await poolConnection.end();
          }
        } catch (error) {
          console.error(error);
          throw new BusinessError({
            code: ErrorConstants.DB_ERROR.code,
            httpCode: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code,
            messages: [error.sqlMessage],
          });
        }
    }

    static async executeSQL(sql, bindParams, target, pool) {
        try {
          const result = await pool.query(
            sql, bindParams
          );
          const data = result;
          const list = [];
          for (let i = 0, size = data.length; i < size; i += 1) {
            list.push(ObjectMapper.map(data[i], target));
          }
          return list;
        } catch (error) {
          console.error(error);
          throw new BusinessError({
            code: ErrorConstants.DB_ERROR.code,
            httpCode: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code,
            messages: error.sqlMessage,
          });
        }
    }
}

module.exports = MySqlDatabase;