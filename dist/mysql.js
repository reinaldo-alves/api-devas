"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const mysql_1 = __importDefault(require("mysql"));
const pool = mysql_1.default.createPool({
    "user": "root",
    "password": "316599database",
    "database": "api-devas",
    "host": "localhost",
    "port": 3306
});
exports.pool = pool;
