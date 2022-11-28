import config from '../config';
import { DataSource } from 'typeorm';
import { UserEntity } from './entity/userEntity';

export const applicationDataSource = new DataSource({
  type: 'mysql',
  host: config.db.host,
  port: Number.parseInt(config.db.port!),
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  entities: [UserEntity],
  logging: false,
  synchronize: true,
});

applicationDataSource
  .initialize()
  .then(() => {
    console.log('Data source has been initialized.');
  })
  .catch((error) => {
    console.log(`Error during Data Source initialization: ${error}`);
  });
