import { Request, Response } from 'express';
import { pool } from '../../../mysql';

class TemploRepository {
    create(request: Request, response: Response){
        const { cidade, estado, presidente } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'INSERT INTO templo (cidade, estado, presidente) VALUES (?,?,?)',
                [cidade, estado, presidente],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao adicionar templo"})
                    }
                    response.status(200).json({message: 'Templo adicionado com sucesso!'})
                }
            )
        })
    }

    get(request: Request, response: Response) {
        const { templo_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM templo WHERE templo_id = ?',
                [templo_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar templo"})
                    }
                    response.status(200).json({message: 'Templo encontrado com sucesso!', templo: result})
                }
            )
        })
    }

    getAll(request: Request, response: Response) {
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM templo',
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar lista de templos"})
                    }
                    response.status(200).json({message: 'Lista de templos retornada com sucesso!', templo: result})
                }
            )
        })
    }

    delete(request: Request, response: Response) {
        const { templo_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'DELETE FROM templo WHERE templo_id = ?',
                [templo_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao excluir templo"})
                    }
                    response.status(200).json({message: 'Templo excluído com sucesso!'})
                }
            )
        })
    }

    update(request: Request, response: Response) {
        const { templo_id, ...updates } = request.body;
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
            params.push(templo_id);
            const updateQuery = `UPDATE templo SET ${updateFields.join(', ')} WHERE templo_id = ?`;
            connection.query(
                updateQuery,
                params,
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao editar templo"})
                    }
                    response.status(200).json({message: 'Templo editado com sucesso!'})
                }
            )
        })
    }

}

export { TemploRepository }