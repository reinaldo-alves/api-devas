import { Request, Response } from 'express';
import { pool } from '../../../mysql';

class MediumRepository {
    create(request: Request, response: Response) {
        const { nome, med, sex, foto, condicao, templo, dtNasc, rg, cpf, mae, pai, natur, naturUF, profissao, estCivil, conjuge, cep, endereco, endNumero, endCompl, endBairro, endCidade, endUF, telefone1, telefone2, email, dtIngresso, dtEmplac, dtIniciacao, dtElevacao, dtCenturia, dtSetimo, dtTestD, dtTestA, dtEmplD, dtEmplA, dtInicD, dtInicA, dtElevD, dtElevA, adjOrigem, temploOrigem, colete, classMest, falMest, povo, falMiss, adjDevas, turnoLeg, turnoTrab, ministro, cavaleiro, dtMinistro, guia, dtGuia, cor, estrela, classif, dtClassif, princesa, pretovelho, caboclo, medico, nomeEmissao, ninfa, mestre, padrinho, madrinha, afilhado, comando, presidente, recepcao, devas, regente, janda, trinoSol, dtTrinoSol, trinoSar, dtTrinoSar, herdeiro, filho, observ } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'INSERT INTO medium (nome, med, sex, foto, condicao, templo, dtNasc, rg, cpf, mae, pai, natur, naturUF, profissao, estCivil, conjuge, cep, endereco, endNumero, endCompl, endBairro, endCidade, endUF, telefone1, telefone2, email, dtIngresso, dtEmplac, dtIniciacao, dtElevacao, dtCenturia, dtSetimo, dtTestD, dtTestA, dtEmplD, dtEmplA, dtInicD, dtInicA, dtElevD, dtElevA, adjOrigem, temploOrigem, colete, classMest, falMest, povo, falMiss, adjDevas, turnoLeg, turnoTrab, ministro, cavaleiro, dtMinistro, guia, dtGuia, cor, estrela, classif, dtClassif, princesa, pretovelho, caboclo, medico, nomeEmissao, ninfa, mestre, padrinho, madrinha, afilhado, comando, presidente, recepcao, devas, regente, janda, trinoSol, dtTrinoSol, trinoSar, dtTrinoSar, herdeiro, filho, observ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                [nome, med, sex, foto, condicao, templo, dtNasc, rg, cpf, mae, pai, natur, naturUF, profissao, estCivil, conjuge, cep, endereco, endNumero, endCompl, endBairro, endCidade, endUF, telefone1, telefone2, email, dtIngresso, dtEmplac, dtIniciacao, dtElevacao, dtCenturia, dtSetimo, dtTestD, dtTestA, dtEmplD, dtEmplA, dtInicD, dtInicA, dtElevD, dtElevA, adjOrigem, temploOrigem, colete, classMest, falMest, povo, falMiss, adjDevas, turnoLeg, turnoTrab, ministro, cavaleiro, dtMinistro, guia, dtGuia, cor, estrela, classif, dtClassif, princesa, pretovelho, caboclo, medico, nomeEmissao, ninfa, mestre, padrinho, madrinha, afilhado, comando, presidente, recepcao, devas, regente, janda, trinoSol, dtTrinoSol, trinoSar, dtTrinoSar, herdeiro, filho, observ],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: error, message: "Erro ao buscar médium"})
                    }
                    const mediumId = result.insertId;
                    response.status(200).json({message: 'Médium adicionado com sucesso!', medium_id: mediumId})
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
        const { medium_id, ...updates } = request.body;
        pool.getConnection((err:any, connection:any) => {
            const updateFields = [] as Array<string>;
            const params = [] as Array<string>;
            for (const prop in updates) {
                if (updates[prop] !== undefined) {
                    updateFields.push(`${prop} = ?`);
                    params.push(updates[prop]);
                }
            }
            if (updateFields.length === 0) {
                return response.status(400).json({error: "Nenhum valor a ser atualizado"});
            }
            params.push(medium_id);
            const updateQuery = `UPDATE medium SET ${updateFields.join(', ')} WHERE medium_id = ?`;
            connection.query(
                updateQuery,
                params,
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

    uploadImage(request: any, response: Response) {
        const { medium_id } = request.query;
        if(!request.file){
            return response.status(400).json({message: "Erro: Imagem inválida"})
        } 
        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'UPDATE medium SET foto = ? WHERE medium_id = ?',
                [request.file.filename, medium_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao atribuir foto do médium"})
                    }
                    response.status(200).json({message: 'Foto do médium carregada e atribuída com sucesso', filename: request.file.filename})
                }
            )
        })
    }

}

export { MediumRepository }