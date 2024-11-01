//rolemodel

import { Sequelize, DataTypes, Model } from "sequelize";

interface RoleAttributes {
  id?: number;
  roleName: string;
}

export default (sequelize: Sequelize) => {
  class Role extends Model<RoleAttributes> implements RoleAttributes {
    public id!: number;
    public roleName!: string;
  }

  Role.init(
    {
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
      sequelize,
      modelName: "Role",
    }
  );

  (Role as any).associate = (models: any) => {
    Role.hasMany(models.Client, { foreignKey: "roleId" });
  };

  return Role;
};
