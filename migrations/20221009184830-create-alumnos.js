"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Alumnos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      primer_Nombre: {
        type: Sequelize.STRING,
      },
      segundo_Nombre: {
        type: Sequelize.STRING,
      },
      primer_Apellido: {
        type: Sequelize.STRING,
      },
      segundo_Apellido: {
        type: Sequelize.STRING,
      },
      identificacion: {
        type: Sequelize.STRING,
      },
      id_profesor: {
        type: Sequelize.INTEGER,
        references: {
          model: "Profesores",
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
    await queryInterface.dropTable("Alumnos");
  },
};
