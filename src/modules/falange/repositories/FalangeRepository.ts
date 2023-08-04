import { Request, Response } from 'express';
import { pool } from '../../../mysql';

class FalangeRepository {
    get(request: Request, response: Response) {
        const { falange_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM falange WHERE falange_id = ?',
                [falange_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar falange"})
                    }
                    response.status(200).json({message: 'Falange encontrada com sucesso!', falange: result})
                }
            )
        })
    }

    getAll(request: Request, response: Response) {
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM falange',
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar lista de falanges"})
                    }
                    response.status(200).json({message: 'Lista de falanges retornada com sucesso!', falange: result})
                }
            )
        })
    }

    update(request: Request, response: Response) {
        const { falange_id, primeira, adjMin, adjNome } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'UPDATE falange SET primeira = ?, adjMin = ?, adjNome = ? WHERE falange_id = ?',
                [primeira, adjMin, adjNome, falange_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao editar falange"})
                    }
                    response.status(200).json({message: 'Falange editada com sucesso!'})
                }
            )
        })
    }

}

export { FalangeRepository }