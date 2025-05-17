"use strict";

module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define(
    "Shop",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hasAccess: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        defaultValue: [],
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      openingHours: DataTypes.STRING,
      closingHours: DataTypes.STRING,
      daysOpen: DataTypes.JSON,
    },
    {
      tableName: "Shops",
      timestamps: true,
    }
  );

  Shop.associate = (models) => {
    Shop.belongsTo(models.User, { foreignKey: "ownerId", onDelete: "CASCADE" });
  };

  return Shop;
};
