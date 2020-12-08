CREATE TABLE Equipo (id_equipo int NOT NULL PRIMARY KEY, nombre varchar(255));

CREATE TABLE Jugador (
	id_jugador int NOT NULL primary key,
	id_equipo int,
	nombre varchar(60),
	apellido varchar(60),
	numero int,
	FOREIGN KEY (id_equipo) REFERENCES equipo(id_equipo)
);

CREATE TABLE Estadio (
	id_estadio int NOT NULL PRIMARY KEY,
	nombre varchar(255),
	id_equipo int,
	FOREIGN KEY (id_equipo) REFERENCES equipo(id_equipo)
);

CREATE TABLE Partido (
	id_partido int NOT NULL PRIMARY KEY,
	id_equipo1 int NOT NULL,
	id_equipo2 int NOT NULL,
	id_equipo_ganador int,
	goles_equipo1 int,
	goles_equipo2 int,
	id_estadio int,
	FOREIGN KEY (id_equipo1) REFERENCES Equipo(id_equipo),
	FOREIGN KEY (id_equipo2) REFERENCES Equipo(id_equipo),
	FOREIGN KEY (id_equipo_ganador) REFERENCES Equipo(id_equipo),
	FOREIGN KEY (id_estadio) REFERENCES Estadio(id_estadio)
);

INSERT INTO Equipo values(1, 'Boca Juniors');
INSERT INTO Equipo values(2, 'River Plate');

INSERT INTO Jugador values(1, 1, 'Carlos', 'Tevez', 10);
INSERT INTO Jugador values(2, 1, 'Sebastián', 'Villa', 22);
INSERT INTO Jugador values(3, 1, 'Esteban', 'Andrada', 1);
INSERT INTO Jugador values(4, 1, 'Emmanuel', 'Mas', 3);
INSERT INTO Jugador values(5, 1, 'Julio', 'Buffarini', 4);
INSERT INTO Jugador values(6, 1, 'Carlos', 'Zambrano', 5);
INSERT INTO Jugador values(7, 1, 'Guillermo', 'Fernandez', 7);
INSERT INTO Jugador values(8, 1, 'Ramon', 'Abila', 9);
INSERT INTO Jugador values(9, 1, 'Eduardo', 'Salvio', 11);
INSERT INTO Jugador values(10, 1, 'Nicolas', 'Capaldo', 14);
INSERT INTO Jugador values(11, 1, 'Frank', 'Fabra', 18);

INSERT INTO Jugador values(12, 2, 'Franco', 'Armani', 1);
INSERT INTO Jugador values(13, 2, 'Javier', 'Pinola', 21);
INSERT INTO Jugador values(14, 2, 'Martínez', 'Quarta', 23);
INSERT INTO Jugador values(15, 2, 'Milton', 'Casco', 2);
INSERT INTO Jugador values(16, 2, 'Gonzalo', 'Montiel', 3);
INSERT INTO Jugador values(17, 2, 'Enzo', 'Perez', 28);
INSERT INTO Jugador values(18, 2, 'Exequiel', 'Palacios', 7);
INSERT INTO Jugador values(19, 2, 'Nicolas', 'De La Cruz', 10);
INSERT INTO Jugador values(20, 2, 'Ignacio', 'Fernandez', 16);
INSERT INTO Jugador values(21, 2, 'Matias', 'Suarez', 29);
INSERT INTO Jugador values(22, 2, 'Rafael', 'Borre', 9);

INSERT INTO Estadio values(1, 'La Bombonera', 1);
INSERT INTO Estadio values(2, 'El Monumental', 2);

INSERT INTO Partido VALUES(1, 1, 2, 1, 5, 4, 1);
INSERT INTO Partido VALUES(2, 2, 1, 2, 3, 1, 2);
INSERT INTO Partido VALUES(3, 1, 2, NULL, 1, 1, 1);