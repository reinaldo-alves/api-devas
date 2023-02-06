"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const mysql_1 = __importDefault(require("mysql"));
const pool = mysql_1.default.createPool({
    "user": "ba88b52f7a093b",
    "password": "788571ae",
    "database": "heroku_a9498be90f83399",
    "host": "us-cdbr-east-06.cleardb.net",
    "port": 3306
});
exports.pool = pool;
