create table Cliente (id int primary key NOT null, nombre varchar(40), apellido varchar(60));
create table Factura (numero int primary key NOT null, idc int references Cliente(idc), monto money);
create table  Producto (id int primary key NOT null, nombre varchar(40), descripcion varchar(100), stock int);
create table Detalle (numero int NOT null references Factura(numero), idp int not null references Producto(id), cantidad int, primary key(numero, idp));

insert into Cliente values(1, 'Lucas', 'Rivero'), (2, 'Facundo', 'Silva'), (3, 'Manuel', 'Seligmann');
insert into factura values(1, 1, 500), (2, 1, 1200), (3, 3,  450), (4, 3, 900), (5, 2, 200);
insert into producto values(1, 'trapeador', 'trapeador de piso', 100), (2, 'escoba', 'escoba de crin', 200), (3, 'lavandina', 'lavandina ayudin', 500);
insert into detalle values(1, 3, 2), (2, 1, 1), (2, 2, 1), (3, 3, 2), (4, 1, 2), (5, 1, 1);