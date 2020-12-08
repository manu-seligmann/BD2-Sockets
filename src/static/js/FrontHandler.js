class FrontHandler {
	refreshDatabasesServers(servers) {
		const select = document.querySelector('#database-servers');
		select.innerHTML = '';

		const unselected = document.createElement('option');
		unselected.innerText = '-- Seleccione un elemento --';
		select.appendChild(unselected);

		for (const server of servers) {
			const option = document.createElement('option');

			option.innerText = this.getServerName(server);
			option.value = server;

			select.appendChild(option);
		}
	}

	getServerName(server) {
		const map = {
			'psql': 'PostgreSQL',
			'firebird': 'Firebird'
		};
		return map[server] ? map[server] : server;
	}

	refreshDatabases(databases) {
		const select = document.querySelector('#databases');
		select.innerHTML = '';

		const unselected = document.createElement('option');
		unselected.innerText = '-- Seleccione un elemento --';
		select.appendChild(unselected);

		for (const db of databases) {
			const option = document.createElement('option');
			option.innerText = db;
			option.value = db;

			select.appendChild(option);
		}
	}

	showTables(tables) {
		const list = document.querySelector('#tables');
		list.innerHTML = '';

		const sqlInput = document.querySelector('#sql-input');
		const sqlButton = document.querySelector('#sql-run');

		for (const table of tables) {
			const li = document.createElement('li');
			li.className="list-group-item list-group-item-action"
			li.onclick = () => {
				sqlInput.value =`SELECT * FROM ${table}`;
				sqlButton.click();
			}
			li.innerText = table;
			list.appendChild(li);
		}
	}

	showResults(result) {
		const { filas, columnas, mensaje } = result;
		if (filas && columnas) this.showTable(columnas, filas);
		this.showMessage(mensaje || "ok");
	}

	showMessage(msg = "", error = false) {
		const txtArea = document.querySelector('#output-message');
		txtArea.className = error ? "form-control is-invalid" : "form-control";
		txtArea.value = msg;
	}

	showTable(columnas, filas) {
		const tableHead = document.querySelector('#output-sql thead')
		const tableBody = document.querySelector('#output-sql tbody')

		tableHead.innerHTML = '';
		tableBody.innerHTML = '';

		const header = document.createElement('tr');
		header.classList.add('header');

		for (const columna of columnas) {
			const th = document.createElement('th');
			th.innerText = columna;
			header.appendChild(th);
		}

		tableHead.appendChild(header);

		for (const fila of filas) {
			const tr = document.createElement('tr');

			for (const columna in fila ) {
				const td = document.createElement('td');
				td.innerText = fila[columna];
				tr.appendChild(td);
			}

			tableBody.appendChild(tr);
		}
	}

	lostConnection(active) {
		const alert = document.querySelector('.error');
		alert.style.display = active ? 'block': 'none';
	}

	registerEvent(elementQuery, event, callback) {
		const element = document.querySelector(elementQuery);
		if (element) element.addEventListener(event, callback);
		else throw new Error(`${elementQuery} no existe`);
	}
}