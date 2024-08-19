import { Request, Response } from 'express';
import { pool } from '../../../mysql';


class CalendarRepository {
    update(request: Request, response: Response){
        const { text } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'INSERT INTO calendar (calendar_id, text) VALUES (1, ?) ON DUPLICATE KEY UPDATE text = VALUES(text)',
                [text],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao atualizar informações do calendário"})
                    }
                    response.status(200).json({message: 'Informações do calendário atualizadas com sucesso!'})
                }
            )
        })
    }

    get(request: Request, response: Response) {
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM calendar',
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar informações do calendário"})
                    }
                    response.status(200).json({message: 'Informações do calendário retornadas com sucesso!', calendar: result})
                }
            )
        })
    }
}

export { CalendarRepository }