import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
export const AlumnoCursos = sequelize.define("Alumno_cursos", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  id_alumno: {
    type: DataTypes.INTEGER,
    references: {
      model: "Alumnos",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  id_curso: {
    type: DataTypes.INTEGER,
    references: {
      model: "Cursos",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
});

// module.exports = (sequelize, DataTypes) => {
//   class Alumno_cursos extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Alumno_cursos.belongsTo(models.Alumnos, {
//         foreignKey: "id",
//         targetKey: "id_alumno",
//       });
//       Alumno_cursos.belongsTo(models.Cursos, {
//         foreignKey: "id",
//         targetKey: "id_curso",
//       });
//     }
//   }
//   Alumno_cursos.init(
//     {
//       id_alumno: DataTypes.INTEGER,
//       id_curso: DataTypes.INTEGER,
//     },
//     {
//       sequelize,
//       modelName: "Alumno_cursos",
//     }
//   );
//   return Alumno_cursos;
// }
