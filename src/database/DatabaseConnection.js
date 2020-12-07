module.exports = class DatabaseConnection {
	constructor(name, host, port) {
		this._name = name;
		this._host = host;
		this._port = port;
	}
	get name() {
		return this._name;
	}
	get host() {
		return this._host;
	}
	get port() {
		return this._port;
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