const knex = require('knex');
const DatabaseConnection = require("./DatabaseConnection");

module.exports = class MysqlDatabase extends DatabaseConnection {
	/**
	 *Creates an instance of MysqlDatabase.
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
		this.newConnection(database);
	}

	get name() {
		return 'mysql';
	}

	newConnection(name) {
		const connection = knex({
			client: this.name,
			connection: {
				host: this.host,
				port: this.port,
				user: this.user,
				password: this.password,
				database: name
			}
		});

		this.connections.set(name, connection);
		return connection;
	}

	async testConnection(dbName) {
		await this.getDb(dbName).raw('select 1+1 as result');
	}

	async executeQuery(query, dbName) {
		const queryResult = await this.getDb(dbName).raw(query);
		if (!Array.isArray(queryResult) || queryResult.length < 2) return {};

		const columnas = queryResult[1].map(field => field.name);
		const filas = queryResult[0].map(rowDataPacket => ({ ...rowDataPacket }));

		return { columnas, filas };
	}

	async getTables(dbName) {
		const queryResult = await this.getDb(dbName).raw(`SHOW TABLES`);
		if (!Array.isArray(queryResult) || queryResult.length <= 0) return [];

		return queryResult[0].map(dbRow => dbRow.Tables_in_test)
	}

	async getDatabases(dbName) {
		const queryResult = await this.getDb(dbName).raw(`SHOW DATABASES;`);
		if (!Array.isArray(queryResult) || queryResult.length <= 0) return [];

		return queryResult[0].map(dbRow => dbRow.Database);
	}
}