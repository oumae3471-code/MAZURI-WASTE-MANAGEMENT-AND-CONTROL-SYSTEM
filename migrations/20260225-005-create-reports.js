module.exports = {
  up: async ({ context: queryInterface, Sequelize }) => {
    await queryInterface.createTable('Reports', {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      reportId: { type: Sequelize.DataTypes.STRING, unique: true, allowNull: false },
      reportType: { type: Sequelize.DataTypes.ENUM('daily', 'weekly', 'monthly', 'quarterly', 'annual', 'custom'), allowNull: false },
      title: { type: Sequelize.DataTypes.STRING(255), allowNull: false },
      description: { type: Sequelize.DataTypes.TEXT },
      dateRangeStart: { type: Sequelize.DataTypes.DATE, allowNull: false },
      dateRangeEnd: { type: Sequelize.DataTypes.DATE, allowNull: false },
      generatedBy: { type: Sequelize.DataTypes.INTEGER.UNSIGNED },
      data: { type: Sequelize.DataTypes.JSON },
      summary: { type: Sequelize.DataTypes.JSON },
      totalWasteCollectedValue: { type: Sequelize.DataTypes.FLOAT },
      totalWasteCollectedUnit: { type: Sequelize.DataTypes.STRING, defaultValue: 'kg' },
      wasteBreakdown: { type: Sequelize.DataTypes.JSON },
      status: { type: Sequelize.DataTypes.ENUM('draft', 'generated', 'reviewed', 'approved', 'archived'), allowNull: false, defaultValue: 'draft' },
      filePath: { type: Sequelize.DataTypes.STRING },
      generatedAt: { type: Sequelize.DataTypes.DATE },
      createdAt: { type: Sequelize.DataTypes.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DataTypes.DATE, allowNull: false }
    });
    await queryInterface.addIndex('Reports', ['dateRangeStart']);
    await queryInterface.addIndex('Reports', ['status']);
    await queryInterface.addIndex('Reports', ['reportType']);
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('Reports');
  }
};
