import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import alumnosRoutes from "./routes/alumnos.routes.js";
import cursosRoutes from "./routes/cursos.routes.js";
import profesoresRoutes from "./routes/profesores.routes.js";
import tipoCuentaRoutes from "./routes/tipoCuenta.routes.js";
import alumnosCursosRoutes from "./routes/alumnoCursos.routes.js";

var app = express();

// view engine setup

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://colegicundi.herokuapp.com",
    optionsSuccessStatus: 200,
  })
);
var allowlist = ["http://example1.com", "http://example2.com"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(alumnosCursosRoutes);
app.use(profesoresRoutes);
app.use(alumnosRoutes);
app.use(cursosRoutes);
app.use(tipoCuentaRoutes);
// catch 404 and forward to error handler

export default app;
