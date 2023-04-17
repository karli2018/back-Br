import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { AlumnoCursos } from "./AlumnoCursos.js";

export const Cursos = sequelize.define("Cursos", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  curso: {
    type: DataTypes.STRING,
  },
  codigo: {
    type: DataTypes.STRING,
  },
  creditos: {
    type: DataTypes.INTEGER,
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
Cursos.hasMany(AlumnoCursos, { foreignKey: "id_curso", sourceKey: "id" });
AlumnoCursos.belongsTo(Cursos, {
  foreignKey: "id_curso",
  targetKey: "id",
});
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Cursos extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Cursos.hasMany("Alumno_cursos", { foreignKey: "id_curso" });
//     }
//   }
//   Cursos.init(
//     {
//       curso: DataTypes.STRING,
//       codigo: DataTypes.STRING,
//       creditos: DataTypes.INTEGER,
//     },
//     {
//       sequelize,
//       modelName: "Cursos",
//     }
//   );
//   return Cursos;
// };
