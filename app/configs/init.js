// sequilize init:

import {Sequelize} from 'sequelize';
import {dbConfig} from './db.conf.js';

const sequelize = new Sequelize(
    dbConfig.development.database,
    dbConfig.development.username,
    dbConfig.development.password,
    {
        host: dbConfig.development.host,
        dialect: dbConfig.development.dialect,
    }
);

export default sequelize;