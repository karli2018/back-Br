import { Usuarios } from "../models/Usuarios.js";
import bycript from "bcrypt";

export const login = async (req, resp) => {
  try {
    const { user, pass } = req.body;
    const usuario = await Usuarios.findOne({
      where: { usuario: user },
    });
    if (usuario) {
      const match = await bycript.compare(pass, usuario.contrasena);
      if (match) {
        return resp.json(usuario);
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

export const getUsuarios = async (req, resp) => {
  try {
    const usuarios = await Usuarios.findAll();
    resp.json(usuarios);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};

export const getUsuario = async (req, resp) => {
  try {
    const { id } = req.params;
    // console.log(id); // Imprimir valor de id para verificar
    const usuario = await Usuarios.findOne({ where: { id } });
    resp.json(usuario);
    // resp.json(id);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};

export const createUsuario = async (req, resp) => {
  try {
    console.log(req.body);
    const { user, pass, email, name, acountType } = req.body;

    const saltRounds = 10;
    const passHash = await bycript.hash(pass, saltRounds);

    const newProfesor = await Usuarios.create({
      usuario: user,
      contrasena: passHash,
      email,
      nombre: name,
      idCuenta: acountType,
    }, {
      returning: true
    });
    resp.json({ id: newProfesor.id });
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};

export const updateUsuario = async (req, resp) => {
  try {
    const { id } = req.params;
    const { pass, email, acountType } = req.body;
    await Usuarios.update(
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

export const deleteUsuario = async (req, resp) => {
  try {
    const { id } = req.params;
    await Usuarios.destroy({ where: { id } });
    // resp.send("Usuario eliminado");
    resp.sendStatus(204);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};
