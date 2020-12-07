module.exports = class DatabaseConnection {
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
	getDb(name) {
		if (!name) name = this.defaultDatabase;
		const connection = this.connections.get(name);
		if (!connection) return this.newConnection(name);
		else return connection;
	}
	newConnection(name) {
		console.warn('Method should be overwritten');
	}

	async testConnection() {
		console.warn('Method should be overwritten');
	}

	async executeQuery(query) {
		console.warn('Method should be overwritten');
	}

	async getTables() {
		console.warn('Method should be overwritten');
	}
}