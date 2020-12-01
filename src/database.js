const mongoose = require("mongoose");

const DB_DATA = require("./db_connection_data.json");

console.log("Conectando a la base de datos...");

mongoose.connect(DB_DATA.URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => {
	console.log("Conectado a la base de datos!");
})
.catch(error => {
	console.error(error);
});

module.exports = mongoose;