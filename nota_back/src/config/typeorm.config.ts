import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({path: '.env.development'})

const config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10 ),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true, //Carga automáticamente las entidades definidas en el proyecto
    synchronize: false, // Sincroniza las entidades con la base de datos (esto puede eliminar y recrear tablas en cada inicio)
    dropSchema: false, // Elimina todas las tablas antes de sincronizar (útil para desarrollo, no usar en producción)
    logging: false, // Habilita o deshabilita el logging de SQL (puede ser útil para debugging)
    entities: [__dirname + '/../**/*.entity{.ts,.js}'], 
    migrations: [__dirname + '/../migrations/*{.ts,.js}']
}

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource( config as DataSourceOptions);