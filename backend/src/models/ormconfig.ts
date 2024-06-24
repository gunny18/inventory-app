import { DataSourceOptions } from "typeorm";

const ormconfig: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "inventory",
  entities: [__dirname + "/entities/*.{js,ts}"],
  synchronize: true,
  connectTimeoutMS: 6000,
  migrations: [],
};

export default ormconfig;
