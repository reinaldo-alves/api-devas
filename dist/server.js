"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = require("./mysql");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send("Bem vindo à aplicação!");
});
app.get('/medium/create', (req, res) => {
    const { idmed, name, med, sex } = req.body;
    mysql_1.pool.getConnection((err, con) => {
        con.query('INSERT INTO medium (medium_id, name, med, sex) VALUES (?,?,?,?)', [idmed, name, med, sex], (error, result, fileds) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json({ message: 'Adicionado com sucesso!' });
        });
    });
});
app.get('/medium/show', (req, res) => {
    const { sex } = req.query;
    mysql_1.pool.getConnection((err, con) => {
        con.query('SELECT * FROM medium WHERE sex = ?', [sex], (error, result, fileds) => {
            con.release();
            if (error) {
                return res.status(400).json({ error: "Erro ao buscar!" });
            }
            res.status(200).json({ message: 'Encontrado com sucesso!', medium: result });
        });
    });
});
app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
});
