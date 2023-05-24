import Sequelize from "sequelize";

export const sequelize = new Sequelize('colegiobr', 'gabyadmin', '26041994Layco', {
  dialect: 'mssql',
  host: 'colegiobr.database.windows.net'
  }
);

