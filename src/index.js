const path = require("path");
const express = require("express");
const cookieParser = require('cookie-parser');
const session = require("express-session");

const AdminAPI = require("./admin_api");

require("./database");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
	secret: require("./session_secret.json").secret,
	resave: false,
	saveUninitialized: false
}));

/*
   Rutas de la API
*/
app.use("/creator", AdminAPI);

/*
   Ruta principal de la aplicación
*/
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(app.get("port"), () => {
   console.log(`Server on port ${app.get("port")}.`);
});