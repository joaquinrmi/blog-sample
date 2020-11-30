const path = require("path");

module.exports = {
	entry: "./src/app/index.js",
	output: {
		path: path.join(__dirname, "src", "public", "res"),
		filename: "app.js",
	},
	module: {
		rules: [
			{
				use: "babel-loader",
				test: /\.js$/,
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader"
				]
			},
			{
				test: /\.svg$/,
				use: [
				   {
						loader: 'svg-url-loader',
						options: {
							limit: 10000
						}
					}
				]
			}
		],
	}
};