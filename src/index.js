const path = require("path");
const express = require("express");

require("./database");

const ContentCreatorAPI = require("./content_creator_api/index");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

/*
   Rutas de la API
*/
app.use("/content/", ContentCreatorAPI);

/*
   Ruta principal de la aplicación
*/
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(app.get("port"), () => {
   console.log(`Server on port ${app.get("port")}.`);
});