const  express = require('express');
const path = require('path');
const knex = require('knex');
const http = require('http');
const socket = require('socket.io');
const PostgresqlDatabase = require('./database/PostgresqlDatabase');
const SocketConnection = require('./sockets/SocketConnection');


class Server {
	
	constructor() {
		this.databases = [];
		this.io = null;
		this.app = null;
	}

	async initialize() {
		await this.initializeDatabases();
		await this.initializeSocket();
	}

	async initializeDatabases() {

		const postgresql = new PostgresqlDatabase('tpsockets', '127.0.0.1', '5432', 'admin', 'admin')
		this.databases.push(postgresql);

		// Prueba la conexión
		try {
			for (const db of this.databases) {
				await db.testConnection();
			}
		} catch (err) {
			console.error(`Connection failed`, err);
			process.exit();
		}
		console.log('[DATABASE] All database connected')
		
	}
	async initializeSocket() {
		this.app = express();
		const port = 3000;
		this.app.use('/',express.static('./src/static'));
		const server = http.createServer(this.app);
		this.io = socket(server);
		server.listen(port, () => {
			console.log(`[WEB SOCKET] Running on ${port}`);
		});

		this.io.on('connection', (socket) => {
			const conn = new SocketConnection(socket, this.databases);
			conn.initialzie();

		});
	}
}

const sv = new Server();
sv.initialize();