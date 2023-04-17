import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Profesores = sequelize.define("Profesores", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  usuario: {
    type: DataTypes.STRING,
  },
  contrasena: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  idCuenta: {
    type: DataTypes.INTEGER,
    references: {
      model: "Tipo_cuenta",
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

// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Profesores extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       Profesores.belongsTo(models.Categoria, {
//         foreignKey: "id",
//         targetKey: "idCuenta",
//       });
//     }
//   }
//   profesores.init(
//     {
//       usuario: DataTypes.STRING,
//       contrasena: DataTypes.STRING,
//       email: DataTypes.STRING,
//       nombre: DataTypes.STRING,
//       idCuenta: DataTypes.INTEGER,
//     },
//     {
//       sequelize,
//       modelName: "Profesores",
//     }
//   );
//   return Profesores;
// };
