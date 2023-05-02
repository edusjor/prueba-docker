# prueba-docker
Notas Docker curso


-Para descargar una imagen docker tomando como ejemplo una imagen de mongo
docker pull mongo

-Ver imagenes docker
docker images

-Crear contenedor en base a una imagen mongo descargada
docker create mongo 
o tambien otra opcion mas larga:
docker container create mongo


-Crear contenedor con un nombre especifico en base a una imagen mongo descargada
docker create --name monguito mongo 

-Para iniciar un contenedor
docker start monguito

-Verificar que el contenedor esta corriendo correctamente
docker ps

-Verificar que contenedores tenemos incluso los que no estan corriendo
docker ps -A

-Detener un contenedor 
docker stop monguito

-Eliminar un contenedor
docker rm monguito

------------------------------------------

-
Primer puerto es el de la maquina nuestra donde instalamos docker, el segundo puerto es el del contenedor docker que vamos a mapear con nuestra maquina
docker create -p27017:27017 --name monguito mongo

-Ver todos los logs de un contenedor, ver su actividad
docker logs monguito   (muestra los logs y se devuelve a la linea de comandos)
docker logs monguito --follow   (este se queda esperando mostrando la actividad)


-Descarga(si no esta descargada), crea e inicializa una imagen automaticamente
docker run -p27017:27017 --name monguito mongo (con esta se abre los logs y si se cierra se detiene la ejecucion)
docker run -d -p27017:27017 --name monguito mongo (el -d es para que no salga los logs y se mantenga ejecutando el contenedor)



-Crea un contenedor mysql agregando de una vez las variables de entorno (-e). Por defecto se usa usuario root 
docker create -p 3306:3306 --name mysqldb -e MYSQL_ROOT_PASSWORD=contrasena mysql


///////
CREATE USER 'tu_usuario'@'192.168.1.2' IDENTIFIED BY 'tu_contraseña';
GRANT ALL PRIVILEGES ON *.* TO 'tu_usuario'@'192.168.1.2' WITH GRANT OPTION;
FLUSH PRIVILEGES;

mysql -h <ip_del_servidor> -u tu_usuario -p

docker exec -it mysqldb mysql -u root -p


CREATE DATABASE mysqldb;
//////

Minuto 58:22