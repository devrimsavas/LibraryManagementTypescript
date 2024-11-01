import { Sequelize, DataTypes, Model } from "sequelize";

interface GenreAttributes {
  id?: number;
  genreName: string;
}

export default (sequelize: Sequelize) => {
  class Genre extends Model<GenreAttributes> implements GenreAttributes {
    public id!: number;
    public genreName!: string;
  }

  Genre.init(
    {
      genreName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Genre",
      tableName: "Genres",
    }
  );

  // Associations
  (Genre as any).associate = (models: any) => {
    Genre.hasMany(models.Book, { foreignKey: "genreId" });
  };

  return Genre;
};
