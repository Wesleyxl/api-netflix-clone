module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("movies", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: { model: "categories", key: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      director: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      duration: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      dislikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      banner: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("movies");
  },
};
