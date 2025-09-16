import mysql from 'mysql';
import { config } from 'dotenv';

config();

const localConnectionObj = {
    "user":process.env.USER_DATABASE,
    "password":process.env.PASSWORD_DATABASE,
    "database":process.env.DATABASE,
    "host":process.env.HOST_DATABASE,
    "port":Number(process.env.PORT_DATABASE)
}

const productionConnectionObj = {
    "user":process.env.USER_DATABASE,
    "password":process.env.PASSWORD_DATABASE,
    "database":process.env.DATABASE,
    "socketPath": process.env.HOST_DATABASE
}

const pool = mysql.createPool(process.env.ENVIRONMENT === 'local' ? localConnectionObj : productionConnectionObj);

export { pool };