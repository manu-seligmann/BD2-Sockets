const  express = require('express');
const path = require('path');
const knex = require('knex');
const http = require('http');
const socket = require('socket.io');


class Server {
	
	constructor() {
		this.databases = [];
		this.io = null;
		this.app = null;
	}

	async initialize() {
		await this.initializeDatabases();
		await this.initializeExpress();
		await this.initializeSocket();
		console.log('Todo bien!');
	}

	async initializeDatabases() {
		
	}
	async initializeExpress() {
		this.app = express();
		const port = 3000;
		this.app.use('/',express.static('./src/static'));
		this.app.listen(port, () => console.log(`[WEB SERVER] Running on ${port}`));
	}
	async initializeSocket() {
		const port = 3001;
		const server = http.createServer();
		this.io = socket(server);
		server.listen(port, () => {
			console.log(`[WEB SOCKET] Running on ${port}`);
		});
		this.io.on('connection', (e)=> console.log(e));
	}
}

const sv = new Server();
sv.initialize();