create table docente (dni int primary key, nombre varchar(255), apellido varchar(255), fecha_nacimiento date, fecha_inicio date, telefono varchar(255));
create table materia (materia_id int primary key, nombre varchar(255), descripcion varchar(255));
create table catedra (
	catedra_id int primary key,
	materia_id int,
	fecha_inicio date,
	fecha_fin date,
	FOREIGN KEY(materia_id) REFERENCES materia(materia_id)
);

 create table docente_catedra (
	 dni int,
	 catedra_id int,
	 PRIMARY KEY (dni, catedra_id),
	 foreign key(dni) references docente(dni),
	 foreign key(catedra_id) references catedra(catedra_id)
);

insert into docente values 
	(12345678, 'Alberto', 'Rodriguez', '1958-11-23', '2010-03-10', "123456789"),
	(98765432, 'Pedro', 'Achaval', '1965-03-09', '2010-03-10', "11111111"),
	(65465445, 'Cristobal', 'Colon', '1451-8-25', '2000-03-02', ""),
	(78965432, 'Julio', 'Profe', '1971-12-06', '2015-03-01', "45654565");

insert into materia values
	(1, 'Base de datos I', 'Cosa de base de datos I'),
	(2, 'Base de datos II', 'Cosa de base de datos II'),
	(3, 'Análisis Matematico I', 'Descripción de Análisis Matemático I');

insert into catedra values
	(1, 1, '2020-03-05', '2020-06-30'),
	(2, 2, '2020-03-05', '2020-06-05'),
	(3, 3, '2020-03-05', '2020-06-05'),
	(4, 3, '2020-06-05', '2020-12-05');
	


insert into docente_catedra values
	(12345678, 1),
	(98765432, 1),
	(65465445, 1),
	(98765432, 2),
	(65465445, 2),
	(78965432, 3),
	(78965432, 4);