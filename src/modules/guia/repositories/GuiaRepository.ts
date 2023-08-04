import { Request, Response } from 'express';
import { pool } from '../../../mysql';

class GuiaRepository {
    create(request: Request, response: Response){
        const { nome } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'INSERT INTO guia (nome) VALUES (?)',
                [nome],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao adicionar guia missionária"})
                    }
                    response.status(200).json({message: 'Guia missionária adicionada com sucesso!'})
                }
            )
        })
    }

    get(request: Request, response: Response) {
        const { guia_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM guia WHERE guia_id = ?',
                [guia_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar guia missionária"})
                    }
                    response.status(200).json({message: 'Guia missionária encontrada com sucesso!', guia: result})
                }
            )
        })
    }

    getAll(request: Request, response: Response) {
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM guia',
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar lista de guias missionárias"})
                    }
                    response.status(200).json({message: 'Lista de guias missionárias retornada com sucesso!', guia: result})
                }
            )
        })
    }

    delete(request: Request, response: Response) {
        const { guia_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'DELETE FROM guia WHERE guia_id = ?',
                [guia_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao excluir guia missionária"})
                    }
                    response.status(200).json({message: 'Guia missionária excluída com sucesso!'})
                }
            )
        })
    }

    update(request: Request, response: Response) {
        const { guia_id, nome } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'UPDATE guia SET nome = ? WHERE guia_id = ?',
                [nome, guia_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao editar guia missionária"})
                    }
                    response.status(200).json({message: 'Guia missionária editada com sucesso!'})
                }
            )
        })
    }

}

export { GuiaRepository }