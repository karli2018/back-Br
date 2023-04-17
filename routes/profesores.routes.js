import { Router } from "express";
import {
  createProfesor,
  deleteProfesor,
  getProfesor,
  getProfesores,
  loginProf,
  updateProfesor,
} from "../controllers/profesores.controller.js";

const router = Router();

router.get("/profesores", getProfesores);

router.get("/profesores/:id", getProfesor);

router.post("/profesores", createProfesor);

router.post("/profesoresLog", loginProf);

router.put("/profesores/:id", updateProfesor);

router.delete("/profesores/:id", deleteProfesor);

export default router;
