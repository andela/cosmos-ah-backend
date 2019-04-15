export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
      unique: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bio: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    imageUrl: {
      type: Sequelize.TEXT,
      validate: {
        isUrl: true,
      },
      allowNull: true,
    },
    notification: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    verificationToken: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.ENUM('admin', 'author', 'user'),
      defaultValue: 'user',
    },
    passwordResetToken: {
      type: Sequelize.STRING,
    },
    resetTokenExpires: {
      type: Sequelize.DATE,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('users'),
};
