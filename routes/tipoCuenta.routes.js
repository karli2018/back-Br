import { Router } from "express";
import { getTipoCuenta } from "../controllers/tipoCuenta.controller.js";

const router = Router();

router.get("/tipocuenta", getTipoCuenta);

export default router;
