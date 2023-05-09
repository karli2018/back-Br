import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { AlumnoCursos } from "./AlumnoCursos.js";
import { Usuarios } from "./Usuarios.js";
export const Alumnos = sequelize.define("Alumnos", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  primer_Nombre: {
    type: DataTypes.STRING,
  },
  segundo_Nombre: {
    type: DataTypes.STRING,
  },
  primer_Apellido: {
    type: DataTypes.STRING,
  },
  segundo_Apellido: {
    type: DataTypes.STRING,
  },
  identificacion: {
    type: DataTypes.STRING,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: "Usuarios",
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
Alumnos.hasMany(AlumnoCursos, { foreignKey: "id_alumno", sourceKey: "id" });
AlumnoCursos.belongsTo(Alumnos, {
  foreignKey: "id_alumno",
  targetKey: "id",
});
Usuarios.hasOne(Alumnos, { foreignKey: "id_usuario", sourceKey: "id" });
Alumnos.belongsTo(Usuarios, { foreignKey: "id_usuario", targetKey: "id" });
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Alumnos extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Alumnos.hasMany("Alumno_cursos", { foreignKey: "id_alumno" });
//     }
//   }
//   Alumnos.init(
//     {
//       primer_Nombre: DataTypes.STRING,
//       segundo_Nombre: DataTypes.STRING,
//       primer_Apellido: DataTypes.STRING,
//       segundo_Apellido: DataTypes.STRING,
//       identificacion: DataTypes.STRING,
//     },
//     {
//       sequelize,
//       modelName: "Alumnos",
//     }
//   );
//   return Alumnos;
// };
