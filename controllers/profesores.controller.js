import { Profesores } from "../models/Profesores.js";
import bycript from "bcrypt";

export const loginProf = async (req, resp) => {
  try {
    const { user, pass } = req.body;
    const profesor = await Profesores.findOne({
      where: { usuario: user },
    });
    if (profesor) {
      const match = await bycript.compare(pass, profesor.contrasena);
      if (match) {
        return resp.json(profesor);
      } else {
        return resp.status(500).json({ message: "credenciales erroneas" });
      }
    } else {
      return resp.status(500).json({ message: "credeciales erroneas" });
    }
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};

export const getProfesores = async (req, resp) => {
  try {
    const profesores = await Profesores.findAll();
    resp.json(profesores);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};

export const getProfesor = async (req, resp) => {
  try {
    const { id } = req.params;
    const profesor = await Profesores.findOne({ where: { id } });
    resp.json(profesor);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};

export const createProfesor = async (req, resp) => {
  try {
    const { user, pass, email, name, acountType } = req.body;

    const saltRounds = 10;
    const passHash = await bycript.hash(pass, saltRounds);

    const newProfesor = await Profesores.create({
      usuario: user,
      contrasena: passHash,
      email,
      nombre: name,
      idCuenta: acountType,
    });
    resp.json(req.body);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};

export const updateProfesor = async (req, resp) => {
  try {
    const { id } = req.params;
    const { pass, email, acountType } = req.body;
    await Profesores.update(
      {
        contrasena: pass,
        email,
        idCuenta: acountType,
      },
      { where: { id } }
    );
    resp.send("actualizado");
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};

export const deleteProfesor = async (req, resp) => {
  try {
    const { id } = req.params;
    await Profesores.destroy({ where: { id } });
    resp.sendStatus(204);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};
