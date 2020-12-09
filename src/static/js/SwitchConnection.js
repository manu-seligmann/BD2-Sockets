class SwitchConnection {
	constructor(frontHandler) {
		this.socket = io();
		this.online = false;
		this.servers = [];
		this.frontHandler = frontHandler;

		this.databases = [];

		this.selectedServer = null;
		this.selectedDatabase = null;
	}
	initialize() {
		this.socket.on('connect', this.handleConnection.bind(this));
		this.socket.on('disconnect', this.handleDisconnect.bind(this));

		this.frontHandler.registerEvent('#database-servers', 'change', e => this.selectDatabaseServer(e.target.value));
		this.frontHandler.registerEvent('#databases', 'change', e => this.selectDatabase(e.target.value));
		
		this.frontHandler.registerEvent('#other-database', 'click',e => this.selectDatabase(document.querySelector('#other-database-input').value, true));
		this.frontHandler.registerEvent('#other-database-input', 'keydown', e => e.keyCode === 13 && this.selectDatabase(e.target.value, true));
		
		this.frontHandler.registerEvent('#sql-run', 'click', e => this.executeQuery(document.querySelector('#sql-input').value));
		this.frontHandler.registerEvent('#sql-input', 'keydown', e => e.keyCode === 13 && this.executeQuery(document.querySelector('#sql-input').value));

		this.frontHandler.registerEvent('#reload-tables', 'click', e => this.reloadTables());
	}
	
	async handleDisconnect() {
		this.frontHandler.lostConnection(true);
	}

	async handleConnection() {
		this.frontHandler.lostConnection(false);
		this.online = true;
		const servers = await this.asyncEmit('getServers')
		this.servers = servers;
		this.frontHandler.refreshDatabasesServers(this.servers);
	}

	async selectDatabaseServer(server) {
		try {
			if (this.selectedServer !== server)
				this.selectedDatabase = null;

			const databases = await this.asyncEmit('getDatabases', server);
			this.selectedServer = server;
			this.databases = databases;
			this.frontHandler.refreshDatabases(databases);
			this.frontHandler.resetOtherDataBaseInput();
			this.frontHandler.showTables([]);
			this.clearOutput();
		} catch (err) {
			this.frontHandler.refreshDatabases([]);
			this.frontHandler.showMessage(err, true);
			console.error(err);
		}
	}
	async selectDatabase(database, external) {
		if (!this.selectedServer) return this.frontHandler.showMessage('Debe seleccionar un servidor', true);
		this.clearOutput();
		try {
			const tables = await this.asyncEmit('getTables', this.selectedServer, database);
			this.selectedDatabase = database;
			this.frontHandler.showTables(tables);

			if (external) this.frontHandler.changeSelectedDatabase(database);
			else this.frontHandler.resetOtherDataBaseInput();
			
		} catch (err) {
			this.frontHandler.showTables([]);
			this.frontHandler.showMessage(err, true);
			console.error(err);
		}
	}

	async reloadTables() {
		if (!this.selectedServer) return this.frontHandler.showMessage('Debe seleccionar un servidor', true);
		if (!this.selectedDatabase) return this.frontHandler.showMessage('Debe seleccionar una base de datos', true);
		try {
			const tables = await this.asyncEmit('getTables', this.selectedServer, this.selectedDatabase);
			this.frontHandler.showTables(tables);
		} catch (err) {
			this.frontHandler.showMessage(err, true);
			console.error(err);
		}
	}

	async executeQuery(query) {
		if (!this.selectedServer) return this.frontHandler.showMessage('Debe seleccionar un servidor', true);
		if (!this.selectedDatabase) return this.frontHandler.showMessage('Debe seleccionar una base de datos', true);
		try {
			const response = await this.asyncEmit('executeQuery', this.selectedServer, this.selectedDatabase, query);
			this.frontHandler.showResults({...response, mensaje: `${query} - OK`});
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
	clearOutput() {
		this.frontHandler.showMessage();
		this.frontHandler.showTable([], []);
	}
}