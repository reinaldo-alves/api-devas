import { Request, Response } from 'express';
import { pool } from '../../../mysql';

class MenorRepository {
    create(request: Request, response: Response) {
        const { nome, sex, condicao, templo, dtNasc, rg, cpf, mae, pai, natur, naturUF, profissao, estCivil, conjuge, cep, endereco, endNumero, endCompl, endBairro, endCidade, endUF, telefone1, telefone2, email, temploOrigem, falMiss, adjDevas, nomeEmissao, observ, responsavel, parentesco, contatoResp } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'INSERT INTO menor (nome, sex, condicao, templo, dtNasc, rg, cpf, mae, pai, natur, naturUF, profissao, estCivil, conjuge, cep, endereco, endNumero, endCompl, endBairro, endCidade, endUF, telefone1, telefone2, email, temploOrigem, falMiss, adjDevas, nomeEmissao, observ, responsavel, parentesco, contatoResp) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                [nome, sex, condicao, templo, dtNasc, rg, cpf, mae, pai, natur, naturUF, profissao, estCivil, conjuge, cep, endereco, endNumero, endCompl, endBairro, endCidade, endUF, telefone1, telefone2, email, temploOrigem, falMiss, adjDevas, nomeEmissao, observ, responsavel, parentesco, contatoResp],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: error, message: "Erro ao buscar médium menor"})
                    }
                    const menorId = result.insertId;
                    response.status(200).json({message: 'Médium menor adicionado com sucesso!', menor_id: menorId})
                }
            )
        })
    }

    get(request: Request, response: Response) {
        const { menor_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM menor WHERE menor_id = ?',
                [menor_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar médium menor"})
                    }
                    response.status(200).json({message: 'Médium menor encontrado com sucesso!', menor: result})
                }
            )
        })
    }

    getAll(request: Request, response: Response) {
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM menor',
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar lista de médiuns menores"})
                    }
                    response.status(200).json({message: 'Lista de médiuns menores retornada com sucesso!', menor: result})
                }
            )
        })
    }

    delete(request: Request, response: Response) {
        const { menor_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'DELETE FROM menor WHERE menor_id = ?',
                [menor_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao excluir médium menor"})
                    }
                    response.status(200).json({message: 'Médium menor excluído com sucesso!'})
                }
            )
        })
    }

    update(request: Request, response: Response) {
        const { menor_id, ...updates } = request.body;
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
            params.push(menor_id);
            const updateQuery = `UPDATE menor SET ${updateFields.join(', ')} WHERE menor_id = ?`;
            connection.query(
                updateQuery,
                params,
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao editar médium menor"})
                    }
                    response.status(200).json({message: 'Médium menor editado com sucesso!'})
                }
            )
        })
    }

}

export { MenorRepository }