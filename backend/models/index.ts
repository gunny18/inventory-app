import { DataSource } from "typeorm";
import ormconfig from "./ormconfig";

export const AppDataSource = new DataSource(ormconfig);

export const initDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};
