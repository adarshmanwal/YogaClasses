'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Shops', 'hasAccess', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true,
      defaultValue: [],
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Shops', 'hasAccess');
  }
};
