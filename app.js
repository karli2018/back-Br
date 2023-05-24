import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import alumnosRoutes from "./routes/alumnos.routes.js";
import cursosRoutes from "./routes/cursos.routes.js";
import profesoresRoutes from "./routes/usuarios.routes.js";
import tipoCuentaRoutes from "./routes/tipoCuenta.routes.js";
import alumnosCursosRoutes from "./routes/alumnoCursos.routes.js";

var app = express();

// view engine setup

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors()
);

app.use(alumnosCursosRoutes);
app.use(profesoresRoutes);
app.use(alumnosRoutes);
app.use(cursosRoutes);
app.use(tipoCuentaRoutes);
// catch 404 and forward to error handler

//Settings
// app.set('port', process.env.PORT || 5000);

export default app;
