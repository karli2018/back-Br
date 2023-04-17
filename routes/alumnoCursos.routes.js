import { Router } from "express";
import {
  createAlumnoCursos,
  deleteAlumnoCursos,
} from "../controllers/alumnosCursos.controller.js";
const router = Router();

router.post("/alumnosCursos", createAlumnoCursos);
router.delete("/alumnosCursos/:id", deleteAlumnoCursos);

export default router;
