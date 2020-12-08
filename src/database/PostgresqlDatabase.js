const knex = require('knex');
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

		this.newConnection(database);
	}
	get name() {
		return 'psql';
	}
	newConnection(name) {
		const connection = knex({
			client: 'pg',
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
		const test = await this.getDb(dbName).raw(`SELECT * FROM pg_catalog.pg_tables where schemaname='public'`);
		return test;
	}

	async executeQuery(query, dbName) {
		const queryResult = await this.getDb(dbName).raw(query);
		const columnas = queryResult.fields.map(field => field.name);
		const filas = queryResult.rows;

		return { columnas, filas };

		// const rows = queryResult.rows.map(row => {
		// 	const parsedRow = {};
		// 	for (const col in row) {
		// 		const colN = fields.indexOf(col);
		// 		parsedRow[`col${n}`] = row[col];
		// 	}

		// 	return parsedRow;
		// });

		// return 

	}

	async getTables(dbName) {
		const queryResult = await this.getDb(dbName).raw(`SELECT * FROM pg_catalog.pg_tables where schemaname = 'public'`);
		return queryResult.rows.map(row => row.tablename);
	}

	async getDatabases(dbName) {
		const queryResult = await this.getDb(dbName).raw(`SELECT datname FROM pg_database`);
		return queryResult.rows.map(row => row.datname);
	}
}