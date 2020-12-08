/**
 * @typedef {Object} queryResponse
 * @property {String[]} columnas
 * @property {Object[]} filas
 */


module.exports = class DatabaseConnection {
	/**
	 * Creates an instance of DatabaseConnection.
	 * @param {String} database
	 * @param {String} host
	 * @param {String} port
	 */
	constructor(database, host, port) {
		this.defaultDatabase = database;
		this._host = host;
		this._port = port;
		this.connections = new Map();
	}

	get name() {
		return 'unset';
	}

	get host() {
		return this._host;
	}

	get port() {
		return this._port;
	}

	/**
	 * Busca o crea una instancia para determinada base de datos
	 * Si no recibe ningún parámetro, utilizará la base de datos por defecto
	 * @param {String} name
	 * @returns {*} Instancia de una conexión de base de datos
	 */
	getDb(name) {
		if (!name) name = this.defaultDatabase;
		const connection = this.connections.get(name);
		if (!connection) return this.newConnection(name);
		else return connection;
	}
	/**
	 * Crea nueva instancia de una base de datos
	 * @param {String} name
	 * @returns {*} Instancia de la nueva conexión
	 */
	newConnection(name) {
		console.warn('Method should be overwritten');
	}

	/**
	 * Prueba la conexión con determinada base de datos
	 *
	 * @param {String} dbName
	 * @returns {Promise}
	 */
	async testConnection(dbName) {
		console.warn('Method should be overwritten');
	}

	/**
	 * Ejecuta una query en una base de datos
	 *
	 * @param {String} query
	 * @param {String} dbName
	 * @returns {queryResponse}
	 */
	async executeQuery(query, dbName) {
		console.warn('Method should be overwritten');
	}

	/**
	 * Obtiene todas las tablas de determinada base de datos
	 *
	 * @param {String} dbName
	 * @returns {String[]}
	 */
	async getTables(dbName) {
		console.warn('Method should be overwritten');
	}

	/**
	 * Obtiene todas las bases de datos
	 *
	 * @param {String} dbName
	 * @returns {String[]}
	 */
	async getDatabases(dbName) {
		console.warn('Method should be overwritten');
	}
}