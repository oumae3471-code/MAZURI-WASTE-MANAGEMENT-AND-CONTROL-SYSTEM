module.exports = {
  up: async ({ context: queryInterface, Sequelize }) => {
    await queryInterface.createTable('DisposalSites', {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      siteId: { type: Sequelize.DataTypes.STRING, unique: true, allowNull: false },
      name: { type: Sequelize.DataTypes.STRING(255), allowNull: false },
      siteType: { type: Sequelize.DataTypes.ENUM('landfill', 'incinerator', 'recycling-center', 'compost-facility', 'transfer-station'), allowNull: false },
      locationAddress: { type: Sequelize.DataTypes.STRING },
      latitude: { type: Sequelize.DataTypes.DECIMAL(10, 8) },
      longitude: { type: Sequelize.DataTypes.DECIMAL(11, 8) },
      capacityTotalValue: { type: Sequelize.DataTypes.FLOAT },
      capacityTotalUnit: { type: Sequelize.DataTypes.STRING, defaultValue: 'tons' },
      capacityCurrentValue: { type: Sequelize.DataTypes.FLOAT },
      capacityCurrentUnit: { type: Sequelize.DataTypes.STRING, defaultValue: 'tons' },
      operatingHoursOpening: { type: Sequelize.DataTypes.STRING },
      operatingHoursClosing: { type: Sequelize.DataTypes.STRING },
      acceptedWasteTypes: { type: Sequelize.DataTypes.JSON },
      managerId: { type: Sequelize.DataTypes.INTEGER.UNSIGNED },
      status: { type: Sequelize.DataTypes.ENUM('active', 'inactive', 'maintenance', 'closed'), allowNull: false, defaultValue: 'active' },
      createdAt: { type: Sequelize.DataTypes.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DataTypes.DATE, allowNull: false }
    });
    await queryInterface.addIndex('DisposalSites', ['status']);
    await queryInterface.addIndex('DisposalSites', ['siteType']);
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('DisposalSites');
  }
};
