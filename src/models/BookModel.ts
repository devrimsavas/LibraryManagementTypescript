//book model

import { Sequelize, DataTypes, Model } from "sequelize";

export default (sequelize: Sequelize) => {
  class Book extends Model {}

  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
      },
      pageNumbers: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Book",
      tableName: "Book",
    }
  );

  (Book as any).associate = (models: any) => {
    Book.belongsTo(models.Library, { foreignKey: "Id" });
    Book.belongsTo(models.Genre, { foreignKey: "genreId" });

    Book.belongsToMany(models.Client, { through: "BorrowedBooks" });
  };

  return Book;
};
