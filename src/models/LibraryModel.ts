//library model

import { Sequelize, DataTypes, Model } from "sequelize";

interface LibraryAttributes {
  id?: number;
  libraryName: string;
}

export default (sequelize: Sequelize) => {
  class Library extends Model<LibraryAttributes> implements LibraryAttributes {
    public id!: number;
    public libraryName!: string;
  }

  Library.init(
    {
      libraryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Library",
      tableName: "Library",
    }
  );

  // Associations
  (Library as any).associate = (models: any) => {
    Library.hasMany(models.Client, { foreignKey: "libraryId" });
    Library.hasMany(models.Book, { foreignKey: "libraryId" });
  };

  return Library;
};
