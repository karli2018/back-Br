import { Router } from "express";
import {
  getAlumnos,
  createAlumno,
  updateAlumno,
  getAlumno,
  deleteAlumnos,
} from "../controllers/alumnos.controller.js";

const router = Router();

router.get("/alumnos", getAlumnos);

router.post("/alumnos", createAlumno);

router.get("/alumnos/:id", getAlumno);

router.put("/alumnos/:id", updateAlumno);

router.delete("/alumnos/:id", deleteAlumnos);

export default router;
