import { Request, Response } from 'express';
import { pool } from '../../../mysql';

class PajeRepository {
    create(request: Request, response: Response) {
        const { medium, dtFalange, responsavel, parentesco, contatoResp } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'INSERT INTO paje (medium, dtFalange, responsavel, parentesco, contatoResp) VALUES (?,?,?,?,?)',
                [medium, dtFalange, responsavel, parentesco, contatoResp],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: error, message: "Erro ao criar complemento de pajé"})
                    }
                    response.status(200).json({message: 'Complemento de pajé adicionado com sucesso!'})
                }
            )
        })
    }

    get(request: Request, response: Response) {
        const { medium } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT paje.*, medium.* FROM paje INNER JOIN medium ON paje.medium = medium.medium_id WHERE paje.medium = ?',
                [medium],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar pajé"})
                    }
                    response.status(200).json({message: 'Pajé encontrado com sucesso!', paje: result})
                }
            )
        })
    }

    getAll(request: Request, response: Response) {
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT paje.*, medium.* FROM paje INNER JOIN medium ON paje.medium = medium.medium_id',
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar lista de pajés"})
                    }
                    response.status(200).json({message: 'Lista de pajés retornada com sucesso!', paje: result})
                }
            )
        })
    }

    delete(request: Request, response: Response) {
        const { medium } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'DELETE FROM paje WHERE medium = ?',
                [medium],
                (error:any, result:any, fileds:any) => {
                    if (error) {
                        connection.release();
                        return response.status(400).json({error: "Erro ao excluir complemento de pajé"})
                    }
                    connection.query(
                        'DELETE FROM medium WHERE medium_id = ?',
                        [medium],
                        (error2:any, result2:any, fileds2:any) => {
                            connection.release();
                            if (error2) {
                                return response.status(400).json({error: "Erro ao excluir pajé"})
                            }
                            response.status(200).json({message: 'Complemento de pajé excluído com sucesso!'})
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
                'DELETE FROM paje WHERE medium = ?',
                [medium],
                (error:any, result:any, fileds:any) => {
                    if (error) {
                        connection.release();
                        return response.status(400).json({error: "Erro ao excluir complemento de pajé"})
                    }
                    response.status(200).json({message: 'Complemento de pajé excluído com sucesso!'})
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
            const updateQuery = `UPDATE paje SET ${updateFields.join(', ')} WHERE medium = ?`;
            connection.query(
                updateQuery,
                params,
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao editar complemento de pajé"})
                    }
                    response.status(200).json({message: 'Complemento de pajé editado com sucesso!'})
                }
            )
        })
    }

}

export { PajeRepository }