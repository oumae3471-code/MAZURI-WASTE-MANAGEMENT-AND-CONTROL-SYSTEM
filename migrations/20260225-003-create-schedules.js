module.exports = {
  up: async ({ context: queryInterface, Sequelize }) => {
    await queryInterface.createTable('Schedules', {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      scheduleId: { type: Sequelize.DataTypes.STRING, unique: true, allowNull: false },
      title: { type: Sequelize.DataTypes.STRING(255), allowNull: false },
      description: { type: Sequelize.DataTypes.TEXT },
      startDate: { type: Sequelize.DataTypes.DATE, allowNull: false },
      endDate: { type: Sequelize.DataTypes.DATE, allowNull: false },
      assignedVehicle: { type: Sequelize.DataTypes.STRING },
      assignedCollectors: { type: Sequelize.DataTypes.JSON },
      supervisorId: { type: Sequelize.DataTypes.INTEGER.UNSIGNED },
      frequency: { type: Sequelize.DataTypes.ENUM('daily', 'weekly', 'bi-weekly', 'monthly', 'custom'), allowNull: false },
      estimatedDurationValue: { type: Sequelize.DataTypes.FLOAT },
      estimatedDurationUnit: { type: Sequelize.DataTypes.STRING, defaultValue: 'hours' },
      expectedQuantityValue: { type: Sequelize.DataTypes.FLOAT },
      expectedQuantityUnit: { type: Sequelize.DataTypes.STRING, defaultValue: 'kg' },
      location: { type: Sequelize.DataTypes.STRING },
      status: { type: Sequelize.DataTypes.ENUM('scheduled', 'in-progress', 'completed', 'cancelled'), allowNull: false, defaultValue: 'scheduled' },
      createdAt: { type: Sequelize.DataTypes.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DataTypes.DATE, allowNull: false }
    });
    await queryInterface.addIndex('Schedules', ['startDate']);
    await queryInterface.addIndex('Schedules', ['status']);
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('Schedules');
  }
};
