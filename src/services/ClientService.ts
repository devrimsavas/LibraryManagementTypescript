import Client from "../models/ClientModel";
import Book from "../models/BookModel";
import Library from "../models/LibraryModel";
import Role from "../models/RoleModel.js";
import bcrypt from "bcrypt";
import { Op, Sequelize } from "sequelize";

class ClientService {
  private Client: any;
  private Role: any;
  private sequelize: Sequelize;

  constructor(db: any) {
    this.sequelize = db.sequelize;
    this.Client = db.Client; // Reference to Client model
    this.Role = db.Role; // Reference to Role model
  }

  // Create a new client
  async createClient(clientData: any) {
    try {
      const newClient = await this.Client.create(clientData);
      return newClient;
    } catch (error: any) {
      throw new Error(`Error creating client: ${error.message}`);
    }
  }

  // Find a client by email
  async findClientByEmail(email: string) {
    try {
      const client = await this.Client.findOne({ where: { email } });
      return client;
    } catch (error: any) {
      throw new Error(`Error finding client: ${error.message}`);
    }
  }

  // Update client information
  async updateClient(clientId: number, updateData: any) {
    try {
      const client = await this.Client.findByPk(clientId);
      if (!client) {
        throw new Error("Client not found");
      }
      await client.update(updateData);
      return client;
    } catch (error: any) {
      throw new Error(`Error updating client: ${error.message}`);
    }
  }

  // Delete client by ID
  async deleteClient(clientId: number) {
    try {
      const client = await this.Client.findByPk(clientId);
      if (!client) {
        throw new Error("Client not found");
      }
      await client.destroy();
      return true;
    } catch (error: any) {
      throw new Error(`Error deleting client: ${error.message}`);
    }
  }

  // Assign role to client
  async assignRole(clientId: number, roleId: number) {
    try {
      const client = await this.Client.findByPk(clientId);
      const role = await this.Role.findByPk(roleId);
      if (!client || !role) {
        throw new Error("Client or Role not found");
      }
      client.setRole(role); // Assuming the association exists
      return client;
    } catch (error: any) {
      throw new Error(`Error assigning role: ${error.message}`);
    }
  }
}

export default ClientService;
