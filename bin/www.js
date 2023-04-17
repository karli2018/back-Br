#!/usr/bin/env node
import app from "../app.js";
import http from "http";
import { sequelize } from "../database/database.js";

import "../models/AlumnoCursos.js";
import "../models/Profesores.js";
import "../models/Alumnos.js";
import "../models/Cursos.js";
import "../models/Tipo_cuenta.js";
/**
 * Module dependencies.
 */

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log("se conecto");
    server.listen(port);
    console.log("se conecto en el puerto", port);
  } catch (error) {
    console.error("no se pudo conectar", error);
  }
}
main();
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
}
