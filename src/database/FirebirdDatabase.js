const firebird = require('node-firebird');
const DatabaseConnection = require("./DatabaseConnection");
module.exports = class PostgresqlDatabase extends DatabaseConnection {
	 /**
	 *Creates an instance of PostgresqlDatabase.
	 * @param {String} database
	 * @param {String} host
	 * @param {String} port
	 * @param {String} user
	 * @param {String} password
	 */
	constructor(database, host, port, user, password) {
		super(database, host, port);
		this.user = user;
		this.password = password;

		this.options = {
			host,
			port,
			database,
			user,
			password,
			lowercase_keys: true
		}
		firebird.attachOrCreate(this.options, function(err, db){
			if (err) throw err;
		});
	}
	get name() {
		return 'Firebird';
	}
	newConnection(name) {
		
	}
	async testConnection(dbName) {
		const test = await this.firebirdAttach(`Select * from RDB$FILES`, dbName);
		return test;
	}

	async executeQuery(query, dbName) {
		const queryResult = await this.firebirdAttach(query, dbName);

		let columnas = [];
		if (Array.isArray(queryResult) && queryResult.length > 0){
			for (const key in queryResult[0]){
				columnas.push(key);
			}
		}
		const filas = queryResult;

		return { columnas, filas };
	}

	async getTables(dbName) {
		const queryResult = await this.firebirdAttach(`SELECT a.RDB$RELATION_NAME FROM RDB$RELATIONS a WHERE COALESCE(RDB$SYSTEM_FLAG, 0) = 0 AND RDB$RELATION_TYPE = 0`, dbName);

		return queryResult.map(row => row.rdb$relation_name);
	}

	async firebirdAttach(query, dbName = null){
		if (dbName) this.options.database = dbName;

		return new Promise((res, rej) => {
			firebird.attach(this.options, function(err, db){
				db.query(query, function(err, result){
					if (err) return rej(err);
					res(result);
				})
			});
		})
	}

	async getDatabases(dbName) {
		return [this.options.database];
	}
}