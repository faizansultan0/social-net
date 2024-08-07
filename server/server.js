const express = require('express');
const cors = require('cors');
const dataBaseConnection = require('./db/db');
const morgan = require('morgan');
const { readdirSync } = require('fs');
require('dotenv').config();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Database connection
dataBaseConnection();

// Middlewares
app.use(express.json({ limit: '5mb'}))
// app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(morgan('dev'));

// Auto Load Routes
const routesDir = path.join(__dirname, "routes");
const routes = readdirSync(routesDir);
routes.map((r) => app.use("/api", require(path.join(routesDir, r))));

app.get("/", (req, res) => {
	res.send("OK");
});

app.listen(PORT,() => console.log(`Listening at PORT ${PORT}`))