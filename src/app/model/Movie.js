const { Model, DataTypes } = require("sequelize");

class Movie extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        year: DataTypes.INTEGER,
        director: DataTypes.STRING,
        type: DataTypes.INTEGER,
        duration: DataTypes.STRING,
        likes: DataTypes.INTEGER,
        dislikes: DataTypes.INTEGER,
        image: DataTypes.STRING,
        banner: DataTypes.STRING,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });
  }
}

module.exports = Movie;
