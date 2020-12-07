module.exports = class SocketConnection {
	constructor(socket, databases) {
		this.socket = socket;
		this.databases = databases;
	}
	initialzie() {
		console.log('conectado', this.socket.id);
		
		// Todos los listeners
		this.socket.on('executeQuery', this.handleExecuteQuery.bind(this));
		this.socket.on('getTables', this.handleGetTables.bind(this));
		this.socket.on('getDatabases', this.handleGetDatabases.bind(this));
		this.socket.on('getServers', this.handleGetServers.bind(this));

		
	}
	getServer(name) {
		return this.databases.find(db => db.name === name);
	}
	async handleExecuteQuery(server, database, query, ack) {
		if (!ack || typeof ack !== 'function') return;
		const serverInstance = this.getServer(server);
		if (!serverInstance) return ack(null, 'Ese servidor no existe');
		try {
			const result = await serverInstance.executeQuery(query, database);
			ack(result)
		} catch (err) {
			ack(null, err.message);
		}
	}
	async handleGetTables(server, database, ack) {
		if (!ack || typeof ack !== 'function') return;
		const serverInstance = this.getServer(server);
		if (!serverInstance) return ack(null, 'Ese servidor no existe');
		try {
			const tables = await serverInstance.getTables(database);
			return ack(tables);
		} catch (err) {
			console.log(err);
			return ack(null, err.message);
		}
	}
	async handleGetDatabases(server, ack) {
		if (!ack || typeof ack !== 'function') return;
		const serverInstance = this.getServer(server);
		if (!serverInstance) return ack(null, 'Ese servidor no existe');

		try {
			const databases = await serverInstance.getDatabases();
			return ack(databases);
		} catch (err) {
			console.log(err);
			return ack(null, err.message);
		}
	}
	handleGetServers(ack) {
		if (!ack || typeof ack !== 'function') return;
		return ack(this.databases.map(db => db.name));
	}
}