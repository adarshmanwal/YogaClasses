'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if the column already exists
    const tableInfo = await queryInterface.describeTable('Users');

    if (!tableInfo.accountId) {
      // Step 1: Add the column allowing NULL temporarily
      await queryInterface.addColumn('Users', 'accountId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Accounts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      
    } else {
      console.log('✅ accountId column already exists in Users table. Skipping...');
    }
    // Step 2: Update existing records with default accountId (e.g., 2)
    await queryInterface.sequelize.query(`
      UPDATE "Users" SET "accountId" = 2 WHERE "accountId" IS NULL
    `);

    // Step 3: Alter column to NOT NULL
    await queryInterface.changeColumn('Users', 'accountId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Accounts',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the column only if it exists
    const tableInfo = await queryInterface.describeTable('Users');
    if (tableInfo.accountId) {
      await queryInterface.removeColumn('Users', 'accountId');
    }
  }
};
