const  express = require('express');
const path = require('path');
const knex = require('knex');
const http = require('http');
const socket = require('socket.io');
const PostgresqlDatabase = require('./database/PostgresqlDatabase');
const FirebirdDatabase = require('./database/FirebirdDatabase');
const MysqlDatabase = require('./database/MysqlDatabase');
const SocketConnection = require('./sockets/SocketConnection');
require('dotenv').config()


class Server {
	/**
	 *Creates an instance of Server.
	 * @memberof Server
	 */
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
		const postgresql = new PostgresqlDatabase(
			process.env.DATABASE_PGNAME,
			process.env.DATABASE_PGHOST,
			process.env.DATABASE_PGPORT,
			process.env.DATABASE_PGUSERNAME,
			process.env.DATABASE_PGPASS
		);

		this.databases.push(postgresql);

		const firebird = new FirebirdDatabase(
			process.env.DATABASE_FBNAME,
			process.env.DATABASE_FBHOST,
			process.env.DATABASE_FBPORT,
			process.env.DATABASE_FBUSERNAME,
			process.env.DATABASE_FBPASS
		);

		this.databases.push(firebird);

		const mysql = new MysqlDatabase(
			process.env.DATABASE_MYNAME,
			process.env.DATABASE_MYHOST,
			process.env.DATABASE_MYPORT,
			process.env.DATABASE_MYUSERNAME,
			process.env.DATABASE_MYPASS
		);

		this.databases.push(mysql);

		// Prueba la conexión
		try {
			for (const db of this.databases) {
				await db.testConnection();
			}
		} catch (err) {
			console.error(`Connection failed`, err);
			process.exit();
		}

		console.log('[DATABASE] All databases connected')
	}

	async initializeSocket() {
		this.app = express();
		this.app.use('/',express.static('./src/static'));

		const server = http.createServer(this.app);
		const port = process.env.WEB_PORT || 3000;

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