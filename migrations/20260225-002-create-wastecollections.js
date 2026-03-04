module.exports = {
  up: async ({ context: queryInterface, Sequelize }) => {
    await queryInterface.createTable('WasteCollections', {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      collectionId: { type: Sequelize.DataTypes.STRING, unique: true, allowNull: false },
      source: { type: Sequelize.DataTypes.ENUM('residential', 'commercial', 'industrial', 'medical', 'other'), allowNull: false },
      wasteType: { type: Sequelize.DataTypes.ENUM('organic', 'plastic', 'metal', 'paper', 'glass', 'hazardous', 'mixed'), allowNull: false },
      quantityValue: { type: Sequelize.DataTypes.FLOAT, allowNull: false },
      quantityUnit: { type: Sequelize.DataTypes.STRING, allowNull: false, defaultValue: 'kg' },
      collectionDate: { type: Sequelize.DataTypes.DATE, allowNull: false },
      vehicle: { type: Sequelize.DataTypes.STRING },
      locationAddress: { type: Sequelize.DataTypes.STRING },
      locationWard: { type: Sequelize.DataTypes.STRING },
      latitude: { type: Sequelize.DataTypes.DECIMAL(10, 8) },
      longitude: { type: Sequelize.DataTypes.DECIMAL(11, 8) },
      collectorId: { type: Sequelize.DataTypes.INTEGER.UNSIGNED },
      status: { type: Sequelize.DataTypes.ENUM('pending', 'in-progress', 'completed', 'verified'), allowNull: false, defaultValue: 'pending' },
      createdAt: { type: Sequelize.DataTypes.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DataTypes.DATE, allowNull: false }
    });
    await queryInterface.addIndex('WasteCollections', ['collectionDate']);
    await queryInterface.addIndex('WasteCollections', ['status']);
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('WasteCollections');
  }
};
