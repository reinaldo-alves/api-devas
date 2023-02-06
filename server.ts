import express from 'express'
import { pool } from './mysql';
const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (req: any, res: any) => {
    res.send("Bem vindo à aplicação!");
})

app.get('/medium/create', (req: any, res: any) => {
    const { idmed, name, med, sex } = req.body;
    pool.getConnection((err:any, con:any) => {
        con.query(
            'INSERT INTO medium (medium_id, name, med, sex) VALUES (?,?,?,?)',
            [idmed, name, med, sex],
            (error:any, result:any, fileds:any) => {
                if (error) {
                    return res.status(400).json(error)
                }
                res.status(200).json({message: 'Adicionado com sucesso!'})
            }
        )
    })

})

app.get('/medium/show', (req: any, res: any) => {
    const { sex } = req.query;
    pool.getConnection((err:any, con:any) => {
        con.query(
            'SELECT * FROM medium WHERE sex = ?',
            [sex],
            (error:any, result:any, fileds:any) => {
                con.release();
                if (error) {
                    return res.status(400).json({error: "Erro ao buscar!"})
                }
                res.status(200).json({message: 'Encontrado com sucesso!', medium: result})
            }
        )
    })

})

app.listen(port, () => {
    console.info(`Server is running on port ${port}`)
})