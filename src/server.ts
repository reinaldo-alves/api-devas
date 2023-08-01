import express from 'express';
import { pool } from './mysql';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
const app = express();

app.use(express.json());
const port = process.env.PORT || 4000;

app.get('/', (req: any, res: any) => {
    res.send("Bem vindo à API Devas!");
})

app.post('/medium/create', (req: any, res: any) => {
    const { nome, med, sex, foto, condicao, templo, dtNasc, rg, cpf, mae, pai, natur, naturUF, profissao, estCivil, conjuge, cep, endereco, endNumero, endCompl, endBairro, endCidade, endUF, telefone1, telefone2, email, dtIngresso, dtEmplac, dtIniciacao, dtElevacao, dtCenturia, dtSetimo, adjOrigem, temploOrigem, colete, classMest, falMest, povo, falMiss, adjDevas, turnoLeg, turnoTrab, ministro, cavaleiro, guia, cor, classif, dataClassif, princesa, pretovelho, caboclo, medico, nomeEmissao, ninfa, mestre, padrinho, madrinha, afilhado, comando, janata, lVermelha, presidente, vicePres, recepcao, devas, regente, trinoSol, dtTrinoSol, trinoSar, observ } = req.body;
    pool.getConnection((err:any, con:any) => {
        con.query(
            'INSERT INTO medium (nome, med, sex, foto, condicao, templo, dtNasc, rg, cpf, mae, pai, natur, naturUF, profissao, estCivil, conjuge, cep, endereco, endNumero, endCompl, endBairro, endCidade, endUF, telefone1, telefone2, email, dtIngresso, dtEmplac, dtIniciacao, dtElevacao, dtCenturia, dtSetimo, adjOrigem, temploOrigem, colete, classMest, falMest, povo, falMiss, adjDevas, turnoLeg, turnoTrab, ministro, cavaleiro, guia, cor, classif, dataClassif, princesa, pretovelho, caboclo, medico, nomeEmissao, ninfa, mestre, padrinho, madrinha, afilhado, comando, janata, lVermelha, presidente, vicePres, recepcao, devas, regente, trinoSol, dtTrinoSol, trinoSar, observ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [nome, med, sex, foto, condicao, templo, dtNasc, rg, cpf, mae, pai, natur, naturUF, profissao, estCivil, conjuge, cep, endereco, endNumero, endCompl, endBairro, endCidade, endUF, telefone1, telefone2, email, dtIngresso, dtEmplac, dtIniciacao, dtElevacao, dtCenturia, dtSetimo, adjOrigem, temploOrigem, colete, classMest, falMest, povo, falMiss, adjDevas, turnoLeg, turnoTrab, ministro, cavaleiro, guia, cor, classif, dataClassif, princesa, pretovelho, caboclo, medico, nomeEmissao, ninfa, mestre, padrinho, madrinha, afilhado, comando, janata, lVermelha, presidente, vicePres, recepcao, devas, regente, trinoSol, dtTrinoSol, trinoSar, observ],
            (error:any, result:any, fileds:any) => {
                con.release();
                if (error) {
                    return res.status(400).json(error)
                }
                res.status(200).json({message: 'Médium adicionado com sucesso!'})
            }
        )
    })
})

app.post('/user/create', (req: any, res: any) => {
    const { name, password, level, medium_id } = req.body;
    pool.getConnection((err:any, con:any) => {
        hash(password, 10, (err, hash) => {
            if(err) {
                return res.status(500).json(err)
            }
            con.query(
                'INSERT INTO user (name, password, level, medium_id) VALUES (?,?,?,?)',
                [name, hash, level, medium_id],
                (error:any, result:any, fileds:any) => {
                    con.release();
                    if (error) {
                        return res.status(400).json({error: "Erro na sua autenticação!"})
                    }
                    res.status(200).json({message: 'Usuário adicionado com sucesso!'})
                }
            )
        })
    })
})

app.post('/user/login', (req: any, res: any) => {
    const { name, password } = req.body;
    pool.getConnection((err:any, con:any) => {
        con.query(
            'SELECT * FROM user WHERE name = ?',
            [name],
            (error:any, results:any, fileds:any) => {
                con.release();
                if (error) {
                    return res.status(400).json({message: "Erro na sua autenticação!"})
                }
                if (!results[0]){
                    return res.status(202).json({message: "Usuário não cadastrado"})
                }
                compare(password, results[0].password, (err, result) => {
                    if (err) {
                        return res.status(400).json({error: "Erro na sua autenticação!"})
                    }
                    if(result) {
                        const token = sign({
                            id: results[0].user_id,
                            name: results[0].name
                        }, "segredo", {expiresIn: "1d"})
                        return res.status(200).json({token: token, message: "Autenticado com sucesso!"})
                    } else {
                        return res.status(200).json({message: "Senha incorreta"})
                    }
                })
            }
        )
    })
})

// app.get('/medium/show', (req: any, res: any) => {
//     const { sex } = req.query;
//     pool.getConnection((err:any, con:any) => {
//         con.query(
//             'SELECT * FROM medium WHERE sex = ?',
//             [sex],
//             (error:any, result:any, fileds:any) => {
//                 con.release();
//                 if (error) {
//                     return res.status(400).json({error: "Erro ao buscar!"})
//                 }
//                 res.status(200).json({message: 'Encontrado com sucesso!', medium: result})
//             }
//         )
//     })

// })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})