const { MSSQLServerConnection } = require('lib-commons/db');

let poolConnection;

const dbconfig = {  
  user: process.env.MS_SQL_SERVER_USERNAME,
  password: process.env.MS_SQL_SERVER_PASSWORD,
  server: process.env.MS_SQL_SERVER_HOST,
  database: process.env.MS_SQL_SERVER_DATABASE,
  options: {
    encrypt: false,
    enableArithAbort: true
    //instanceName: 'sql'
    },
};

class MSSQLConnection extends MSSQLServerConnection {
  static async getPool() {
    if (!poolConnection) {
      poolConnection = await this.createPool(dbconfig);      
    }
    return poolConnection;
  }

  static async _createPool() {
    if (!poolConnection) {
      poolConnection = await MSSQLServerConnection.createPool(dbconfig);      
    }
  }

  static async executeSQL(sql, bindParams, target) {
    await this._createPool();
    const result = await MSSQLServerConnection.executeSQL(sql, bindParams, target, poolConnection);
    // TODO: Se esta trabajando en una mejor form de cerrar el pool de conexiones
    // await MySqlDatabase.closePool(poolConnection);
    return result;
  }
}

module.exports = MSSQLConnection;
