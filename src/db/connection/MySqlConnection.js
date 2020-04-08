const MySqlDb = require('mysql');
const Logger = require('../../helpers/utils/LoggerUtils');
const BusinessError = require('../../models/BusinessError');
const HttpConstants = require('../../helpers/constants/HttpConstants');
const ObjectMapper = require('../../helpers/mapper/ObjectMapper');
const ErrorConstants = require('../../helpers/constants/ErrorConstants');

/**
* Abstract class that should be used to connect to MySQL database.
* @author Jorge M. Herrera Tume
*/

class MySqlConnection {
    static async createPool(dbConfig) {
        Logger.debug('MySqlConnection - Creating pool connection.');
        const poolConnection = MySqlDb.createPool(dbConfig);
        poolConnection.on('acquire', (connection) => {
            Logger.debug(`MySqlConnection - Connection ${connection.threadId} acquired`);
        });
        poolConnection.on('connection', (connection) => {
            Logger.debug(`MySqlConnection - Connection ${connection.threadId} created`);
        });
        poolConnection.on('enqueue', () => {
            Logger.debug('MySqlConnection - Waiting for available connection slot');
          });
        poolConnection.on('release', (connection) => {
        Logger.debug(`MySqlConnection - Connection ${connection.threadId} released`);
        });
        Logger.debug('MySqlConnection - Pool connection created.');
        return poolConnection;
    }

    /**
     * Get config connection.
     * @override
     */
    static getConfig() {
        return undefined;
    }

    /**
     * Get connection pool.
     * @override
     */
    static async getPool(){
        throw new BusinessError({
            code: ErrorConstants.DB_ERROR.code,
            httpCode: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code,
            messages: ['Esta funcion debe ser implementada.'],
        })
    }

    static async closePool(pool) {
        try {
            Logger.debug(`MySqlConnection - Closing pool connection time ${new Date().toISOString()}`);
            const endPromise = new Promise((resolve, reject) => {
                pool.end((error) => {
                    if(error) {
                        reject(error);
                    }
                    resolve();
                });
            });
            await endPromise;
            Logger.debug(`MySqlConnection - Pool connection closed time ${new Date().toISOString()}`);
        } catch(error) {
            Logger.error(error);
            throw new BusinessError({
                code: ErrorConstants.DB_ERROR.code,
                httpCode: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code,
                messages: [HttpConstants.INTERNAL_SERVER_ERROR_STATUS.description],
            });
        }
    }

    static async bindQueryParams(connection, sql, bindParams) {
        try {
            let bindSql =`${sql}`;
            Object.keys(bindParams).forEach((tp) => {
                const value = connection.escape(bindParams[tp]);
                bindSql = bindSql.replace(new RegExp(`: ${tp}`, 'g'), value);
            });

            return bindSql;
        } catch (error) {
            Logger.error(error);
            throw new BusinessError({
                code: ErrorConstants.DB_ERROR.code,
                httpCode: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code,
                messages: [HttpConstants.INTERNAL_SERVER_ERROR_STATUS.description],
            });
        }
    }

    static async getConnection(hasPool = true) {
        try {
            Logger.debug(`MySqlConnection - Obtaining database connection time: ${new Date().toISOString()}`);
            let connection;
            if(hasPool) {
                const pool = await this.getPool();
                const connectionPromise = new Promise((resolve, reject) => {
                    pool.getConnection((error, conn) => {
                        if(error) {
                            reject(error);
                        }
                        resolve(conn);
                    });
                });
                connection = await connectionPromise;
                Logger.debug(`MySqlConnection - Database connection obtained time: ${new Date().toISOString()}`);
            } else {
                //
                const { user, password, host, database } = this.getConfig();
                connection = await MySqlDb.createConnection({
                    user: user,
                    password: password,
                    host: host,
                    database: database,
                });
                Logger.debug(`MySqlConnection - Database connection obtained time: ${new Date().toISOString()}`);
            }
            return connection;
        } catch (error) {
            Logger.error(error);
            throw new BusinessError({
                code: ErrorConstants.DB_ERROR.code,
                httpCode: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code,
                messages: error.messages || [HttpConstants.INTERNAL_SERVER_ERROR_STATUS.description],
            });
        }
    }

    static async releaseConnection(connection, hasPool = true) {
        try {
            Logger.debug(`MySqlConnection - Releasing database connection time: ${new Date().toISOString()}`);
            if (hasPool) {
                connection.release();
            } else {
                connection.destroy();
            }
            Logger.debug(`MySqlConnection - Database connection released time: ${new Date().toISOString()}`);
        } catch (error) {
            Logger.error(error);
            throw new BusinessError({
                code: ErrorConstants.DB_ERROR.code,
                httpCode: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code,
                messages: [HttpConstants.INTERNAL_SERVER_ERROR_STATUS.description],
            });
        }
    }

    static async closeConnection(connection) {
        try {
          Logger.debug(`MySqlConnection - Closing database connection time: ${new Date().toISOString()}`);
          const endPromise = new Promise((resolve, reject) => {
            connection.end((error) => {
              if (error) {
                reject(error);
              }
              resolve();
            });
          });
          await endPromise;
          Logger.debug(`MySqlConnection - Database connection closed time: ${new Date().toISOString()}`);
        } catch (error) {
          Logger.error(error);
          throw new BusinessError({
            code: ErrorConstants.DB_ERROR.code,
            httpCode: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code,
            messages: [HttpConstants.INTERNAL_SERVER_ERROR_STATUS.description],
          });
        }
    }

    /**
     * @todo Implement this function.
     */
    static async commit() {
        //some code...
    }

    /**
     * @todo Implement this function.
     */
    static async rollback() {
        //some code...
    }

    static async _execute(connection, statement) {
        try {
            Logger.debug(`MySqlConnection - Executing SQL statement time: ${new Date().toISOString()}`);
            Logger.debug(statement);
            const queryPromise = new Promise((resolve, reject) => {
                connection.query(statement, (error, results) => {
                    if (error) {
                        Logger.debug(error);
                        reject(error);
                    }
                    resolve(results);
                });
            });
            const result = await queryPromise;
            Logger.debug(`MySqlConnection - SQL statement executed time: ${new Date().toISOString()}`);
            return result;
        } catch (error) {
            Logger.error(error);
            throw new BusinessError({
                code: ErrorConstants.DB_ERROR.code,
                httpCode: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code,
                messages: [HttpConstants.INTERNAL_SERVER_ERROR_STATUS.description],
            });            
        }
    }

    /**
   * Execute SQL Statement.
   * @param {Object} config - Configuration of Database Connection.
   * @param {string} config.connection - Database Connection.
   * @param {(Object|string)} config.statement - SQL Statement.
   * @param {Object} [config.bindParams] - The query parameters.
   * @param {Object} [config.target] - The object where the query result is linked.
   * @return {Object|Object[]} Query result.
   */
  static async executeSQLStatement({
      connection,
      statement,
      bindParams = {},
      target,
  }) {
      try {
          let result;
          if (typeof statement === 'string') {
              const query = await this.bindQueryParams(connection, statement, bindParams);
              result = await this._execute(connection, statement);
          } else {
              result = await this._execute(connection, statement);
          }

          if (target) {
              const data = result;
              const objects = [];
              data.forEach((obj) => {
                objects.push(ObjectMapper.map(obj, target));
              });
              return objects;
          }

          return result;
      } catch (error) {
        Logger.error(error);
        throw new BusinessError({
          code: ErrorConstants.DB_ERROR.code,
          httpCode: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code,
          messages: error.messages,
        });
      }
  }

  /**
   * Execute SQL query with pagination.
   * @param {Object} config - Configuration of Database Connection.
   * @param {string} config.connection - Database Connection.
   * @param {string} config.projection - Projection section of SQL Sentence.
   * @param {string} config.selection - Selection section of SQL Sentence.
   * @param {Object} [config.bindParams] - The query parameters.
   * @param {Object} [config.target] - The object where the query result is linked.
   * @param {Object} [config.pagination={ page = 0, size = 1}] - The parameters of pagination.
   * @return {Object} Query result.
   */
  static async executeQueryPageable({
    connection,
    projection,
    selection,
    bindParams = {},
    target,
    pagination = { page: 0, size: 1 },
  }) {
    try {
      const offset = Number(pagination.page) * Number(pagination.size);
      const query = `
        ${projection} ${selection} limit ${offset}, ${Number(pagination.size)}
      `;

      const queryCount = `select count(*) total ${selection}`;
      const resultCount = await this.executeSQLStatement({
        connection: connection, statement: queryCount, bindParams: bindParams,
      });

      const contenido = await this.executeSQLStatement({
        connection: connection, statement: query, bindParams: bindParams, target: target,
      });
      pagination.total = resultCount[0].total;
      return { pagination: pagination, content: contenido };
    } catch (error) {
      Logger.error(error);
      throw new BusinessError({
        code: error.code,
        httpCode: error.httpCode,
        messages: error.messages,
      });
    }
  }
   
}

module.exports = MySqlConnection;