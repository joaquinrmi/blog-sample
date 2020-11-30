const path = require("path");
const express = require("express");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, "public")));

/*
   Ruta principal de la aplicación
*/
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(app.get("port"), () => {
   console.log(`Server on port ${app.get("port")}.`);
});