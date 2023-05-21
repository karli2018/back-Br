import Sequelize from "sequelize";

// export const sequelize = new Sequelize("pruebabr","root","1234", {
//   // host: process.env.MYSQLHOST,
//   host: "localhost",
//   dialect: "mysql",
// });

export const sequelize = new Sequelize('colegiobr', 'Bris4s', 'Prueb4sl', {
  dialect: 'mssql',
  host: 'localhost'
  }
);

