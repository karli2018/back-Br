import { Router } from "express";
import {
  getAlumnos,
  createAlumno,
  updateAlumno,
  getAlumno,
  deleteAlumnos,
  createAlumnoValidationRules,
  updateAlumnoValidationRules
} from "../controllers/alumnos.controller.js";

const router = Router();

router.get("/alumnos", getAlumnos);

router.post("/alumnos", createAlumnoValidationRules(),  createAlumno);

router.get("/alumnos/:id", getAlumno);

router.put("/alumnos/:id", updateAlumnoValidationRules(), updateAlumno);

router.delete("/alumnos/:id", deleteAlumnos);

export default router;
