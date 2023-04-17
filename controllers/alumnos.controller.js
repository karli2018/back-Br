import { AlumnoCursos } from "../models/AlumnoCursos.js";
import { Alumnos } from "../models/Alumnos.js";
import { Cursos } from "../models/Cursos.js";
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
    const alumno = await Alumnos.findOne({
      where: { id },
      include: {
        model: AlumnoCursos,

        attributes: ["id"],

        include: { model: Cursos },
      },
    });
    resp.json(alumno);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};
export const createAlumno = async (req, resp) => {
  try {
    const { fname, sname, flastname, slastname, identificacion, profe } =
      req.body;
    const newAlumno = await Alumnos.create({
      primer_Nombre: fname,
      segundo_Nombre: sname,
      primer_Apellido: flastname,
      segundo_Apellido: slastname,
      identificacion: identificacion,
      id_profesor: profe,
    });
    resp.json(newAlumno);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};

export const updateAlumno = async (req, resp) => {
  try {
    const { id } = req.params;
    const { fname, sname, flastname, slastname, identificacion, id_profesor } =
      req.body;
    const newAlumno = {
      primer_Nombre: fname,
      segundo_Nombre: sname,
      primer_Apellido: flastname,
      segundo_Apellido: slastname,
      identificacion: identificacion,
      id_profesor,
    };

    const result = await Alumnos.update(
      { ...newAlumno },

      { where: { id } }
    );
    resp.send(result);
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
