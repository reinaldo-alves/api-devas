import { Request, Response } from 'express';
import { pool } from '../../../mysql';

class MinistroRepository {
    create(request: Request, response: Response){
        const { nome } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'INSERT INTO ministro (nome) VALUES (?)',
                [nome],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao adicionar ministro"})
                    }
                    response.status(200).json({message: 'Ministro adicionado com sucesso!'})
                }
            )
        })
    }

    get(request: Request, response: Response) {
        const { ministro_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM ministro WHERE ministro_id = ?',
                [ministro_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar ministro"})
                    }
                    response.status(200).json({message: 'Ministro encontrado com sucesso!', ministro: result})
                }
            )
        })
    }

    getAll(request: Request, response: Response) {
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM ministro',
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar lista de ministros"})
                    }
                    response.status(200).json({message: 'Lista de ministros retornada com sucesso!', ministro: result})
                }
            )
        })
    }

    delete(request: Request, response: Response) {
        const { ministro_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'DELETE FROM ministro WHERE ministro_id = ?',
                [ministro_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao excluir ministro"})
                    }
                    response.status(200).json({message: 'Ministro excluído com sucesso!'})
                }
            )
        })
    }

    update(request: Request, response: Response) {
        const { ministro_id, nome } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'UPDATE ministro SET nome = ? WHERE ministro_id = ?',
                [nome, ministro_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao editar ministro"})
                    }
                    response.status(200).json({message: 'Ministro editado com sucesso!'})
                }
            )
        })
    }

}

export { MinistroRepository }