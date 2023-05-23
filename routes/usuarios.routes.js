import { Router } from "express";
import {
  createUsuario,
  deleteUsuario,
  getUsuario,
  getUsuarios,
  login,
  updateUsuario,
  createUsuarioValidationRules
} from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/usuarios", getUsuarios);

router.get("/usuarios/:id", getUsuario);

router.post("/usuarios", createUsuarioValidationRules(), createUsuario);

router.post("/profesoresLog", login);

router.put("/usuarios/:id", updateUsuario);

router.delete("/profesores/:id", deleteUsuario);

export default router;
