import { Request, Response } from 'express';
import { pool } from '../../../mysql';

class MenorRepository {
    create(request: Request, response: Response) {
        const { medium, dtFalange, responsavel, parentesco, contatoResp } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'INSERT INTO menor (medium, dtFalange, responsavel, parentesco, contatoResp) VALUES (?,?,?,?,?)',
                [medium, dtFalange, responsavel, parentesco, contatoResp],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: error, message: "Erro ao criar complemento de médium menor"})
                    }
                    response.status(200).json({message: 'Complemento de médium menor adicionado com sucesso!'})
                }
            )
        })
    }

    get(request: Request, response: Response) {
        const { medium } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT menor.*, medium.* FROM menor INNER JOIN medium ON menor.medium = medium.medium_id WHERE menor.medium = ?',
                [medium],
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
                'SELECT menor.*, medium.* FROM menor INNER JOIN medium ON menor.medium = medium.medium_id',
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
        const { medium } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'DELETE FROM menor WHERE medium = ?',
                [medium],
                (error:any, result:any, fileds:any) => {
                    if (error) {
                        connection.release();
                        return response.status(400).json({error: "Erro ao excluir complemento de médium menor"})
                    }
                    connection.query(
                        'DELETE FROM medium WHERE medium_id = ?',
                        [medium],
                        (error2:any, result2:any, fileds2:any) => {
                            connection.release();
                            if (error2) {
                                return response.status(400).json({error: "Erro ao excluir médium menor"})
                            }
                            response.status(200).json({message: 'Complemento de médium menor excluído com sucesso!'})
                        }
                    )
                }
            )
        })
    }

    deleteComp(request: Request, response: Response) {
        const { medium } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'DELETE FROM menor WHERE medium = ?',
                [medium],
                (error:any, result:any, fileds:any) => {
                    if (error) {
                        connection.release();
                        return response.status(400).json({error: "Erro ao excluir complemento de médium menor"})
                    }
                    response.status(200).json({message: 'Complemento de médium menor excluído com sucesso!'})
                }
            )
        })
    }

    update(request: Request, response: Response) {
        const { medium, ...updates } = request.body;
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
            params.push(medium);
            const updateQuery = `UPDATE menor SET ${updateFields.join(', ')} WHERE medium = ?`;
            connection.query(
                updateQuery,
                params,
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao editar complemento de médium menor"})
                    }
                    response.status(200).json({message: 'Complemento de médium menor editado com sucesso!'})
                }
            )
        })
    }

}

export { MenorRepository }