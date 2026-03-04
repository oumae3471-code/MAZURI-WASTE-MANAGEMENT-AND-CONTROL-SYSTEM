module.exports = {
  up: async ({ context: queryInterface, Sequelize }) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: { type: Sequelize.DataTypes.STRING(50), allowNull: false },
      lastName: { type: Sequelize.DataTypes.STRING(50), allowNull: false },
      email: { type: Sequelize.DataTypes.STRING(100), allowNull: false, unique: true },
      phone: { type: Sequelize.DataTypes.STRING(20), unique: true },
      password: { type: Sequelize.DataTypes.STRING, allowNull: false },
      role: { type: Sequelize.DataTypes.ENUM('admin', 'manager', 'collector', 'supervisor', 'viewer'), allowNull: false, defaultValue: 'collector' },
      department: { type: Sequelize.DataTypes.ENUM('collection', 'disposal', 'scheduling', 'reporting', 'admin') },
      location: { type: Sequelize.DataTypes.STRING },
      profileImage: { type: Sequelize.DataTypes.STRING },
      isActive: { type: Sequelize.DataTypes.BOOLEAN, defaultValue: true },
      lastLogin: { type: Sequelize.DataTypes.DATE },
      createdAt: { type: Sequelize.DataTypes.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DataTypes.DATE, allowNull: false }
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('Users');
  }
};
