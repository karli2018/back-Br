import { AlumnoCursos } from "../models/AlumnoCursos.js";

export const createAlumnoCursos = async (req, resp) => {
  try {
    const { addCurso, alumno } = req.body;
    const newAlumnoCurso = await AlumnoCursos.create({
      id_alumno: alumno,
      id_curso: addCurso,
    });
    resp.json(newAlumnoCurso);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};
export const deleteAlumnoCursos = async (req, resp) => {
  try {
    const { id } = req.params;
    console.log(id);
    await AlumnoCursos.destroy({ where: { id } });
    resp.sendStatus(204);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};
