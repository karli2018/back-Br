import { AlumnoCursos } from "../models/AlumnoCursos.js";
import { Alumnos } from "../models/Alumnos.js";
import { Cursos } from "../models/Cursos.js";
import { Usuarios } from "../models/Usuarios.js";
import bycript from "bcrypt";
import {body, validationResult} from 'express-validator';

export const createAlumnoValidationRules = () => {
  return [
    body('fname').exists().withMessage('Ingrese un primer nombre')
      .matches(/^[a-zA-Z\s]+$/).withMessage('El primer nombre solo puede contener letras y espacios'),
    body('sname')
      .optional()
      .matches(/^[a-zA-Z\s]+$/).withMessage('El segundo nombre debe contener solo letras'),
    body('flastname').exists().withMessage('Ingrese primer apellido')
      .matches(/^[a-zA-Z\s]+$/).withMessage('El primer apellido debe contener solo letras'),
    body('slastname').exists().withMessage('Ingrese segundo apellido')
      .matches(/^[a-zA-Z\s]+$/).withMessage('El segundo apellido debe contener solo letras'),
    body('identificacion')
      .exists().withMessage('Ingrese número de identificación')
      .isLength({ max: 10 }).withMessage('Número de identificación demasiado largo')
      .isNumeric().withMessage('Número de identificación debe ser numérico'),
    body('correo')
      .optional()
      .matches(/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}/).withMessage('Ingrese un correo válido'),
    body('usuario')
      .optional()
      .matches(/^[A-Za-z0-9_]+$/).withMessage('Ingrese un usuario valido'),
    body('contrasena')
      .optional()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/).withMessage('Minimo 8 caracteres, al menos 1 mayuscula, 1 minuscula, 1 número y un caracter especial'),
    body('idUsuario')
      .optional()
      .isInt().withMessage('El id de usuario debe ser un número entero')
  ];
};
export const updateAlumnoValidationRules = () => {
  return [
    body('fname').exists().withMessage('Ingrese un primer nombre')
      .matches(/^[a-zA-Z\s]+$/).withMessage('El primer nombre solo puede contener letras y espacios'),
    body('sname')
      .optional()
      .matches(/^[a-zA-Z\s]+$/).withMessage('El segundo nombre debe contener solo letras'),
    body('flastname').exists().withMessage('Ingrese primer apellido')
      .matches(/^[a-zA-Z\s]+$/).withMessage('El primer apellido debe contener solo letras'),
    body('slastname').exists().withMessage('Ingrese segundo apellido')
      .matches(/^[a-zA-Z\s]+$/).withMessage('El segundo apellido debe contener solo letras'),
    body('identificacion')
      .exists().withMessage('Ingrese número de identificación')
      .isLength({ max: 10 }).withMessage('Número de identificación demasiado largo')
      .isNumeric().withMessage('Número de identificación debe ser numérico'),
    body('correo')
      .optional()
      .matches(/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}/).withMessage('Ingrese un correo válido'),
    body('usuario')
      .optional()
      .matches(/^[A-Za-z0-9_]+$/).withMessage('Ingrese un usuario valido'),
    body('contrasena')
      .optional()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/).withMessage('Minimo 8 caracteres, al menos 1 mayuscula, 1 minuscula, 1 número y un caracter especial'),
    body('idUser')
      .optional()
      .isInt().withMessage('El id de usuario debe ser un número entero')
  ];
};

export const getAlumnos = async (req, resp) => {
  try {
    const alumnos = await Alumnos.findAll({
      include: {
        model: AlumnoCursos,

        attributes: ["id"],

        include: { model: Cursos },
      },
    });
    resp.json(alumnos);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};

export const getAlumno = async (req, resp) => {
  try {
    const { id } = req.params;
    console.log(id, 'getAlumno');
    const alumno = await Alumnos.findOne({
      where: { id },
      include: [{
        model: AlumnoCursos,

        attributes: ["id"],

        include: { model: Cursos },

      },
      {
        model: Usuarios
      }
    ]
    });
    resp.json(alumno);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};
export const createAlumno = async (req, resp) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const valores = req.body;
      const validaciones = errors.array();
      return resp.status(422).json({errors: errors.array()});
    }
    
    const { fname, sname, flastname, slastname, identificacion, correo, usuario, contrasena } =
    req.body;
    let newUsuario = null;
    const saltRounds = 10;

    if (correo && usuario && contrasena)
    {

    const passHash = await bycript.hash(contrasena, saltRounds);
      newUsuario = await Usuarios.create({
        usuario,
        contrasena: passHash,
        email: correo,
        nombre: `${fname} ${flastname}`,
        idCuenta: 2,
      });
    }
    console.log(newUsuario);
    const newAlumno = await Alumnos.create({
      primer_Nombre: fname,
      segundo_Nombre: sname,
      primer_Apellido: flastname,
      segundo_Apellido: slastname,
      identificacion: identificacion,
      id_usuario: newUsuario?newUsuario.id:null,
    });
    resp.json(newAlumno);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};

export const updateAlumno = async (req, resp) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(422).json({errors: errors.array()});
    }
    const { id } = req.params;
    const { fname, sname, flastname, slastname, identificacion,idUser, correo, usuario, contrasena } =
      req.body;
      let newUsuario = null;
      const saltRounds = 10;
      newUsuario = idUser ? await Usuarios.findOne({where: {id: idUser}}):null;
      if(!newUsuario && correo && contrasena && usuario) {        
          const passHash = await bycript.hash(contrasena, saltRounds);
          newUsuario = await Usuarios.create({
          usuario,
          email: correo,
          nombre: `${fname} ${flastname}`,
          contrasena: passHash,
          idCuenta: 2
          },
          
          
        );}
    const newAlumno = {
      primer_Nombre: fname,
      segundo_Nombre: sname,
      primer_Apellido: flastname,
      segundo_Apellido: slastname,
      identificacion: identificacion,
      id_usuario: newUsuario?newUsuario.id:null,
    };
    let resultUs = null;
    if(newUsuario) {    
      const passHash = await bycript.hash(contrasena, saltRounds);
        resultUs = await Usuarios.update(
        { email: correo, usuario, contrasena: contrasena?passHash:newUsuario.contrasena},
        { where: {id: newUsuario.id}}
      );
    }
    const result = await Alumnos.update(
      { ...newAlumno },

      { where: { id } }
    );
    resp.send({...result, usuario: resultUs});
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};
export const deleteAlumnos = async (req, resp) => {
  try {
    const { id } = req.params;
    await Alumnos.destroy({ where: { id } });
    resp.sendStatus(204);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};
