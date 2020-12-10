# BD2-Sockets
### Integrantes
* Facundo Silva (162115)
* Manuel Seligmann (162624)
* Lucas Rivero (162114)

### Instalación

#### Con Docker:
Es necesario tener docker y docker compose y ejecutar en el directorio del proyecto:
```
docker-compose up
```
#### Sin Docker:
* **Se requiere tener instalado NodeJS**

1. Correr el siguiente comando para instalar todas las dependencias dentro del directorio del proyecto:
```
npm install
```
2. Crear un archivo basado en el `.env.example` llamado `.env` y llenar los campos segun corresponda.
3. Ejecutar `npm run start` para iniciar el servidor switch.

#### Notas:
En caso de querer recrear las bases de datos utilizadas en la carpeta `dockerInits` se encuentran los scripts correspondientes para crear cada una.