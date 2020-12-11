# Blog

Un ejemplo de blog desarrollado con el stack MERN (MongoDB, Express, React.js y Node.js).

![Captura de pantalla 2020-12-11 - 17 28 24](https://user-images.githubusercontent.com/28006144/101951808-5cbf1980-3bd6-11eb-9a9c-c65414c50a05.png)

## Características

### Aplicación de usuario final

* Página de inicio con un resumen de los últimos 10 artículos publicados.
* Los **artículos** se componen de: título, contenido, imagen de portada, autor y etiquetas.
* Página de **categoría**, la cual muestra los artículos etiquetados con una palabra específica.
* Página de artículo, en la que se puede leer todo el contenido del mismo.

### Aplicación de administrador

Para acceder a la aplicación de administración, habrá que entrar a la dirección `/secret/admin-panel`.

* Formularios de **inicio de sesión** y **registro**.
![login](https://user-images.githubusercontent.com/28006144/101950846-baeafd00-3bd4-11eb-82ef-258eb5784349.png)
![signup](https://user-images.githubusercontent.com/28006144/101950873-c5a59200-3bd4-11eb-8f77-e4d8cbb7c77a.png)
* Formulario de **creación de artículos**.
* Tipos de usuarios: **administrador** y **creador**.
* Para crear una cuenta se necesita de una clave generada por el administrador.