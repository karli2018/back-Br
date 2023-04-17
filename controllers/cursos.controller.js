import { Cursos } from "../models/Cursos.js";
export const getCursos = async (req, resp) => {
  try {
    const cursos = await Cursos.findAll();
    resp.json(cursos);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};

export const getCurso = async (req, resp) => {
  try {
    const { id } = req.params;
    const curso = await Cursos.findOne({ where: { id } });
    resp.json(curso);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};
export const createCurso = async (req, resp) => {
  try {
    const { curso, codigo, creditos } = req.body;
    const newCurso = await Cursos.create({
      curso,
      codigo,
      creditos,
    });
    resp.json(newCurso);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};
export const updateCurso = async (req, resp) => {
  try {
    const { id } = req.params;
    const { curso, codigo, creditos } = req.body;

    await Cursos.update(
      {
        curso,
        codigo,
        creditos,
      },
      { where: { id } }
    );
    resp.send("actualizado");
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};
export const deleteCurso = async (req, resp) => {
  try {
    const { id } = req.params;
    await Cursos.destroy({ where: { id } });
    resp.sendStatus(204);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};
