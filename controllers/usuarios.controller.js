import { Usuarios } from "../models/Usuarios.js";
import {Alumnos} from "../models/Alumnos.js";
import bycript from "bcrypt";
import {body, validationResult} from 'express-validator';

export const createUsuarioValidationRules = () => {
  return [
    body('user').exists().withMessage('Ingrese un usuario')
      .matches(/^[A-Za-z0-9_]+$/).withMessage('El usuario solo puede contener letras, numeros y guion bajo'),
    body('pass').exists().withMessage('Ingrese una contraseña')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/).withMessage('Mínimo 8 caracteres, 1 minuscula, 1 mayuscula, 1 número'),
    body('name').exists().withMessage('Ingrese nombre completo')
      .matches(/^[A-Za-z ]+$/).withMessage('El nombre solo permite letras y espacios'),
    body('email').exists().withMessage('Ingrese email')
      .matches(/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}/).withMessage('Ingrese un correo valido'),
    body('acountType')
      .custom((value, { req }) => {
        if (typeof value == '0' || value === null || value === '') {
          throw new Error('El tipo de cuenta no puede estar vacío');
        }
        if (value && (!Number.isInteger(value) || value < 1 || value === 0)) {
          throw new Error('El tipo de cuenta debe ser un número entero mayor que cero');
        }
        return true;
      })
  ];
};

export const login = async (req, resp) => {
  try {
    const { user, pass } = req.body;
    const usuario = await Usuarios.findOne({
      where: { usuario: user },
      include: [{
        model: Alumnos,
        attributes: ["id"],

      },]
    });
    if (usuario) {
      const match = await bycript.compare(pass, usuario.contrasena);
      if (match) {
        return resp.json(usuario);
      } else {
        return resp.status(401).json({ message: "credenciales erroneas" });
      }
    } else {
      return resp.status(401).json({ message: "credenciales erroneas" });
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(422).json({errors: errors.array()});
    }
    console.log(req.body);
    const { user, pass, email, name, acountType } = req.body;

    const saltRounds = 10;
    const passHash = await bycript.hash(pass, saltRounds);

  try {
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
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return resp.status(422).json({ message: 'El tipo de cuenta especificado no existe' });
    }
    throw error;
  }
  } catch (error) {
    return resp.status(500).json({ message: 'Ocurrió un error en el servidor' });

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
