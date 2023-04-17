import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Profesores } from "./Profesores.js";

export const Tipo_cuenta = sequelize.define("Tipo_cuenta", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  cuenta: {
    type: DataTypes.STRING,
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
Tipo_cuenta.hasMany(Profesores, {
  foreignKey: "idCuenta",
  sourceKey: "id",
});
Profesores.belongsTo(Tipo_cuenta, {
  foreignKey: "idCuenta",
  targetKey: "id",
});
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Tipo_cuenta extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Tipo_cuenta.hasMany(models.Profesores, {
//         foreignKey: "idCuenta",
//       });
//     }
//   }
//   Tipo_cuenta.init(
//     {
//       cuenta: DataTypes.STRING,
//     },
//     {
//       sequelize,
//       modelName: "Tipo_cuenta",
//     }
//   );
//   return Tipo_cuenta;
// };
