import { Request, Response } from 'express';
import { pool } from '../../../mysql';

function realCons(cons: any){
    if (cons == 1) return [1, 4]
    else if (cons == 2) return [2, 4]
    else if (cons == 3) return [3]
    else return [4]
}

class ConsagracaoRepository {
    add(request: Request, response: Response){
        const { medium, consagracao, termo } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'INSERT INTO consagracao (medium, consagracao, termo) VALUES (?,?,?)',
                [medium, consagracao, termo],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao adicionar médium em consagração", data: error})
                    }
                    response.status(200).json({message: 'Médium adicionado com sucesso em consagração!'})
                }
            )
        })
    }

    getByCons(request: Request, response: Response) {
        const { consagracao } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM consagracao WHERE consagracao IN (?)',
                [realCons(consagracao)],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar lista de médiuns para consagração"})
                    }
                    response.status(200).json({message: 'Lista de médiuns para consagração retornada com sucesso!', data: realCons(consagracao), list: result})
                }
            )
        })
    }

    getAll(request: Request, response: Response) {
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM consagracao ORDER BY consagracao ASC',
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar lista de médiuns para consagrações"})
                    }
                    response.status(200).json({message: 'Lista de médiuns para consagrações retornada com sucesso!', list: result})
                }
            )
        })
    }

    delete(request: Request, response: Response) {
        const { consagracao_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'DELETE FROM consagracao WHERE consagracao_id = ?',
                [consagracao_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao excluir médium da consagração"})
                    }
                    response.status(200).json({message: 'Médium excluído com sucesso da consagração!'})
                }
            )
        })
    }

    updateTermo(request: Request, response: Response) {
        const { consagracao_id, termo } = request.body;
        const termoNumber = termo ? 1 : 0;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'UPDATE consagracao SET termo = ? WHERE consagracao_id = ?',
                [termoNumber, consagracao_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao editar status do termo"})
                    }
                    response.status(200).json({message: 'Status do termo editado com sucesso!'})
                }
            )
        })
    }

    nextCons(request: Request, response: Response) {
        const { consagracao_id, consagracao } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'UPDATE consagracao SET consagracao = ? WHERE consagracao_id = ?',
                [consagracao, consagracao_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao adicionar o médiums na nova consagração"})
                    }
                    response.status(200).json({message: 'Médium adicionado com sucesso à nova consagração!'})
                }
            )
        })
    }

}

export { ConsagracaoRepository }