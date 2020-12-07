const knex = require('knex');
const DatabaseConnection = require("./DatabaseConnection");
module.exports = class PostgresqlDatabase extends DatabaseConnection {
	constructor(name, host, port, user, password) {
		super(name, host, port);
		/*
			CREATE DATABASE tpsockets;
			CREATE USER admin;
			alter user admin with encrypted password 'admin';
			grant all privileges on database tpsockets to admin;

		*/
		this.db = knex({
			client: 'pg',
			connection: {
				host,
				port,
				user,
				password,
				database: name
			}
		})
	}

	async testConnection() {
		return this.db.raw(`SELECT * FROM pg_catalog.pg_tables where schemaname='public';`);
	}

	async executeQuery(query) {
		const queryResult = await this.db.raw(query);
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

	async getTables() {
		const queryResult = await this.db.raw(`SELECT * FROM pg_catalog.pg_tables where schemaname='public';`);
		return queryResult.rows.map(row => row.schemaname);
	}
}