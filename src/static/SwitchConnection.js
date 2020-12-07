class SwitchConnection {
	constructor(frontHandler) {
		this.socket = io();
		this.online = false;
		this.servers = [];
		this.frontHandler = frontHandler;
	}
	initialize() {
		this.socket.on('connect', this.handleConnection.bind(this));

		this.frontHandler.registerEvent('#database-servers', 'change', e => this.selectDatabaseServer(e.target.value));
		this.frontHandler.registerEvent('#databases', 'change', e => this.selectDatabase(e.target.value));
		this.frontHandler.registerEvent('#sql-run', 'click', e => this.executeQuery(document.querySelector('#sql-input').value));
	}
	async handleConnection() {
		this.online = true;
		const servers = await this.asyncEmit('getServers')
		this.servers = servers;
		
		// Hacer cosas en del front
		this.frontHandler.refreshDatabasesServers(this.servers);
	}

	async selectDatabaseServer(server) {
		try {
			const databases = await this.asyncEmit('getDatabases', server);
			this.selectedServer = server;
			this.frontHandler.refreshDatabases(databases);
		} catch (err) {
			this.frontHandler.showMessage(err, true);
			console.error(err);
		}
	}
	async selectDatabase(database) {
		if (!this.selectedServer) return console.log('Hay que seleccionar un server primero');
		try {
			const tables = await this.asyncEmit('getTables', this.selectedServer, database);
			this.selectedDatabase = database;
			this.frontHandler.showTables(tables);
		} catch (err) {
			this.frontHandler.showMessage(err, true);
			console.error(err);
		}
	}

	async executeQuery(query) {
		if (!this.selectedServer) return console.error('Debe seleccionar un servidor');
		if (!this.selectedDatabase) return console.error('Debe seleccionar una base de datos');
		try {
			const response = await this.asyncEmit('executeQuery', this.selectedServer, this.selectedDatabase, query);
			this.frontHandler.showResults(response);
		} catch (err) {
			this.frontHandler.showMessage(err, true);
			console.error(err);
		}
	}

	async asyncEmit(...params) {
		return new Promise((res, rej) => {
			this.socket.emit(...params, (emResponse, error) => {
				if (!error) res(emResponse)
				else rej(error);
			});
		});
	}
}