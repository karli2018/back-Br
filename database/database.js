import Sequelize from "sequelize";

export const sequelize = new Sequelize(process.env.MYSQL_URL, {
  host: process.env.MYSQLHOST,
  dialect: "mysql",
});
