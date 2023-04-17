"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Profesores", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      usuario: {
        type: Sequelize.STRING,
      },
      contrasena: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      nombre: {
        type: Sequelize.STRING,
      },
      idCuenta: {
        type: Sequelize.INTEGER,
        references: {
          model: "Tipo_cuenta",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Profesores");
  },
};
