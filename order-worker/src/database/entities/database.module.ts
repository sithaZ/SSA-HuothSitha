import { DynamicModule, Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DATA_SOURCE } from './database.constants';

type DbOptions = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(options: DbOptions): DynamicModule {
    const dataSourceProvider = {
      provide: DATA_SOURCE,
      useFactory: async () => {
        const ds = new DataSource({
          type: 'postgres',
          host: options.host,
          port: options.port,
          username: options.username,
          password: options.password,
          database: options.database,

          entities: [process.cwd() + '/dist/**/*.entity.js'],
          synchronize: true, 
        });

        return ds.initialize();
      },
    };

    return {
      module: DatabaseModule,
      providers: [dataSourceProvider],
      exports: [dataSourceProvider],
    };
  }
  static forFeature(entities: Function[]): DynamicModule {
    const providers = entities.map((entity) => ({
      
      provide: `${entity.name.toUpperCase()}_REPO`,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
      inject: [DATA_SOURCE],
    }));

    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
