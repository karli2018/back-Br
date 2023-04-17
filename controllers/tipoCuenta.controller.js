import { Tipo_cuenta } from "../models/Tipo_cuenta.js";
export const getTipoCuenta = async (req, resp) => {
  try {
    const tipo_cuenta = await Tipo_cuenta.findAll();
    resp.json(tipo_cuenta);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};
