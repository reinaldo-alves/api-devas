import { Request, Response } from 'express';
import { pool } from '../../../mysql';

class MediumRepository {
    create(request: Request, response: Response) {
        const { nome, med, sex, foto, condicao, templo, dtNasc, rg, cpf, mae, pai, natur, naturUF, profissao, estCivil, conjuge, cep, endereco, endNumero, endCompl, endBairro, endCidade, endUF, telefone1, telefone2, email, dtIngresso, dtEmplac, dtIniciacao, dtElevacao, dtCenturia, dtSetimo, adjOrigem, temploOrigem, colete, classMest, falMest, povo, falMiss, adjDevas, turnoLeg, turnoTrab, ministro, cavaleiro, guia, cor, classif, dataClassif, princesa, pretovelho, caboclo, medico, nomeEmissao, ninfa, mestre, padrinho, madrinha, afilhado, comando, janata, lVermelha, presidente, vicePres, recepcao, devas, regente, trinoSol, dtTrinoSol, trinoSar, observ } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'INSERT INTO medium (nome, med, sex, foto, condicao, templo, dtNasc, rg, cpf, mae, pai, natur, naturUF, profissao, estCivil, conjuge, cep, endereco, endNumero, endCompl, endBairro, endCidade, endUF, telefone1, telefone2, email, dtIngresso, dtEmplac, dtIniciacao, dtElevacao, dtCenturia, dtSetimo, adjOrigem, temploOrigem, colete, classMest, falMest, povo, falMiss, adjDevas, turnoLeg, turnoTrab, ministro, cavaleiro, guia, cor, classif, dataClassif, princesa, pretovelho, caboclo, medico, nomeEmissao, ninfa, mestre, padrinho, madrinha, afilhado, comando, janata, lVermelha, presidente, vicePres, recepcao, devas, regente, trinoSol, dtTrinoSol, trinoSar, observ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                [nome, med, sex, foto, condicao, templo, dtNasc, rg, cpf, mae, pai, natur, naturUF, profissao, estCivil, conjuge, cep, endereco, endNumero, endCompl, endBairro, endCidade, endUF, telefone1, telefone2, email, dtIngresso, dtEmplac, dtIniciacao, dtElevacao, dtCenturia, dtSetimo, adjOrigem, temploOrigem, colete, classMest, falMest, povo, falMiss, adjDevas, turnoLeg, turnoTrab, ministro, cavaleiro, guia, cor, classif, dataClassif, princesa, pretovelho, caboclo, medico, nomeEmissao, ninfa, mestre, padrinho, madrinha, afilhado, comando, janata, lVermelha, presidente, vicePres, recepcao, devas, regente, trinoSol, dtTrinoSol, trinoSar, observ],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: error, message: "Erro ao buscar médium"})
                    }
                    response.status(200).json({message: 'Médium adicionado com sucesso!'})
                }
            )
        })
    }

    get(request: Request, response: Response) {
        const { medium_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM medium WHERE medium_id = ?',
                [medium_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar médium"})
                    }
                    response.status(200).json({message: 'Médium encontrado com sucesso!', medium: result})
                }
            )
        })
    }

    getAll(request: Request, response: Response) {
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM medium',
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar lista de médiuns"})
                    }
                    response.status(200).json({message: 'Lista de médiuns retornada com sucesso!', medium: result})
                }
            )
        })
    }

    delete(request: Request, response: Response) {
        const { medium_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'DELETE FROM medium WHERE medium_id = ?',
                [medium_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao excluir médium"})
                    }
                    response.status(200).json({message: 'Médium excluído com sucesso!'})
                }
            )
        })
    }

    update(request: Request, response: Response) {
        const { medium_id, nome, med, sex, foto, condicao, templo, dtNasc, rg, cpf, mae, pai, natur, naturUF, profissao, estCivil, conjuge, cep, endereco, endNumero, endCompl, endBairro, endCidade, endUF, telefone1, telefone2, email, dtIngresso, dtEmplac, dtIniciacao, dtElevacao, dtCenturia, dtSetimo, adjOrigem, temploOrigem, colete, classMest, falMest, povo, falMiss, adjDevas, turnoLeg, turnoTrab, ministro, cavaleiro, guia, cor, classif, dataClassif, princesa, pretovelho, caboclo, medico, nomeEmissao, ninfa, mestre, padrinho, madrinha, afilhado, comando, janata, lVermelha, presidente, vicePres, recepcao, devas, regente, trinoSol, dtTrinoSol, trinoSar, observ } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'UPDATE medium SET nome = ?, med = ?, sex = ?, foto = ?, condicao = ?, templo = ?, dtNasc = ?, rg = ?, cpf = ?, mae = ?, pai = ?, natur = ?, naturUF = ?, profissao = ?, estCivil = ?, conjuge = ?, cep = ?, endereco = ?, endNumero = ?, endCompl = ?, endBairro = ?, endCidade = ?, endUF = ?, telefone1 = ?, telefone2 = ?, email = ?, dtIngresso = ?, dtEmplac = ?, dtIniciacao = ?, dtElevacao = ?, dtCenturia = ?, dtSetimo = ?, adjOrigem = ?, temploOrigem = ?, colete = ?, classMest = ?, falMest = ?, povo = ?, falMiss = ?, adjDevas = ?, turnoLeg = ?, turnoTrab = ?, ministro = ?, cavaleiro = ?, guia = ?, cor = ?, classif = ?, dataClassif = ?, princesa = ?, pretovelho = ?, caboclo = ?, medico = ?, nomeEmissao = ?, ninfa = ?, mestre = ?, padrinho = ?, madrinha = ?, afilhado = ?, comando = ?, janata = ?, lVermelha = ?, presidente = ?, vicePres = ?, recepcao = ?, devas = ?, regente = ?, trinoSol = ?, dtTrinoSol = ?, trinoSar = ?, observ = ? WHERE medium_id = ?',
                [nome, med, sex, foto, condicao, templo, dtNasc, rg, cpf, mae, pai, natur, naturUF, profissao, estCivil, conjuge, cep, endereco, endNumero, endCompl, endBairro, endCidade, endUF, telefone1, telefone2, email, dtIngresso, dtEmplac, dtIniciacao, dtElevacao, dtCenturia, dtSetimo, adjOrigem, temploOrigem, colete, classMest, falMest, povo, falMiss, adjDevas, turnoLeg, turnoTrab, ministro, cavaleiro, guia, cor, classif, dataClassif, princesa, pretovelho, caboclo, medico, nomeEmissao, ninfa, mestre, padrinho, madrinha, afilhado, comando, janata, lVermelha, presidente, vicePres, recepcao, devas, regente, trinoSol, dtTrinoSol, trinoSar, observ, medium_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao editar médium"})
                    }
                    response.status(200).json({message: 'Médium editado com sucesso!'})
                }
            )
        })
    }

}

export { MediumRepository }