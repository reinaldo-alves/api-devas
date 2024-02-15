import { Request, Response } from 'express';
import { pool } from '../../../mysql';

class EventoRepository {
    create(request: Request, response: Response){
        const { medium, data, mensagem, tipo, observ } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'INSERT INTO evento (medium, data, mensagem, tipo, observ) VALUES (?,?,?,?,?)',
                [medium, data, mensagem, tipo, observ],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao adicionar evento na linha do tempo"})
                    }
                    response.status(200).json({message: 'Evento adicionado com sucesso na linha do tempo!'})
                }
            )
        })
    }

    get(request: Request, response: Response) {
        const { medium } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM evento WHERE medium = ?',
                [medium],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar eventos da linha do tempo do médium"})
                    }
                    response.status(200).json({message: 'Eventos da linha do tempo do médium encontrados com sucesso!', evento: result})
                }
            )
        })
    }

    getAll(request: Request, response: Response) {
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM evento',
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar lista de eventos"})
                    }
                    response.status(200).json({message: 'Lista de eventos retornada com sucesso!', evento: result})
                }
            )
        })
    }

    delete(request: Request, response: Response) {
        const { evento_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'DELETE FROM evento WHERE evento_id = ?',
                [evento_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao excluir evento da linha do tempo"})
                    }
                    response.status(200).json({message: 'Evento excluído da linha do tempo com sucesso!'})
                }
            )
        })
    }

    update(request: Request, response: Response) {
        const { evento_id, ...updates } = request.body;
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
            params.push(evento_id);
            const updateQuery = `UPDATE evento SET ${updateFields.join(', ')} WHERE evento_id = ?`;
            connection.query(
                updateQuery,
                params,
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao editar evento da linha do tempo"})
                    }
                    response.status(200).json({message: 'Evento da linha do tempo editado com sucesso!'})
                }
            )
        })
    }

}

export { EventoRepository }