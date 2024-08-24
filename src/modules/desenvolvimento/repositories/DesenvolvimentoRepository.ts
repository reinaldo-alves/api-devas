import { Request, Response } from 'express';
import { pool } from '../../../mysql';


class DesenvolvimentoRepository {
    update(request: Request, response: Response){
        const { mes, freq } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'INSERT INTO desenvolvimento (mes, freq) VALUES (?, ?) ON DUPLICATE KEY UPDATE freq = VALUES(freq)',
                [mes, freq],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao atualizar a frequência do desenvolvimento"})
                    }
                    response.status(200).json({message: 'Frequência do desenvolvimento atualizada com sucesso!'})
                }
            )
        })
    }

    get(request: Request, response: Response) {
        const { mes } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM desenvolvimento WHERE mes = ?',
                [mes],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar frequência do desenvolvimento"})
                    }
                    response.status(200).json({message: 'Frequência do desenvolvimento encontrada com sucesso!', list: result})
                }
            )
        })
    }

    getAll(request: Request, response: Response) {
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM desenvolvimento',
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar lista de frequências do desenvolvimento"})
                    }
                    response.status(200).json({message: 'Lista de frequências do desenvolvimento retornada com sucesso!', list: result})
                }
            )
        })
    }

}

export { DesenvolvimentoRepository }