const { MySqlDatabase, MySqlConnection } = require('lib-commons/db');

let poolConnection;

const dbconfig = {  
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
};

console.log(dbconfig);




class DBCloudConnection extends MySqlConnection {
  static async getPool() {
    if (!poolConnection) {
      poolConnection = await this.createPool(dbconfig);
    }
    return poolConnection;
  }

  static async _createPool() {
    if (!poolConnection) {
      poolConnection = await MySqlDatabase.createPool(dbconfig);
    }
  }

  static async executeSQL(sql, bindParams, target) {
    await this._createPool();
    const result = await MySqlDatabase.executeSQL(sql, bindParams, target, poolConnection);
    // TODO: Se esta trabajando en una mejor form de cerrar el pool de conexiones
    // await MySqlDatabase.closePool(poolConnection);
    return result;
  }
}

module.exports = DBCloudConnection;
