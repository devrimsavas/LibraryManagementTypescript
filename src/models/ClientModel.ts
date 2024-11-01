//client model

import { Sequelize, DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

interface ClientAttributes {
  id?: number;
  name: string;
  email: string;
  telephone: string;
  penalty?: number;
  password: string;
  role?: "admin" | "user" | "guest";
}

export default (sequelize: Sequelize) => {
  class Client extends Model<ClientAttributes> implements ClientAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public telephone!: string;
    public penalty!: number;
    public password!: string;
    public role!: "admin" | "user" | "guest";

    // Add validPassword method to the Client prototype
    public async validPassword(password: string): Promise<boolean> {
      return await bcrypt.compare(password, this.password);
    }
  }

  Client.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      penalty: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "user", "guest"),
        defaultValue: "user",
      },
    },
    {
      sequelize,
      modelName: "Client",
      tableName: "Client",
      hooks: {
        beforeCreate: async (client: Client) => {
          if (client.password) {
            const salt = await bcrypt.genSalt(10);
            client.password = await bcrypt.hash(client.password, salt);
          }
        },
        beforeUpdate: async (client: Client) => {
          if (client.password) {
            const salt = await bcrypt.genSalt(10);
            client.password = await bcrypt.hash(client.password, salt);
          }
        },
      },
      timestamps: false,
    }
  );

  // Associations
  (Client as any).associate = (models: any) => {
    Client.belongsTo(models.Role, { foreignKey: "roleId" });
    Client.belongsTo(models.Library, { foreignKey: "libraryId" });
    Client.belongsToMany(models.Book, { through: "BorrowedBooks" });
  };

  return Client;
};
