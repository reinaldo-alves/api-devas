import { Request, Response } from 'express';
import { pool } from '../../../mysql';

class CavaleiroRepository {
    create(request: Request, response: Response){
        const { nome, med } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'INSERT INTO cavaleiro (nome, med) VALUES (?,?)',
                [nome, med],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao adicionar cavaleiro"})
                    }
                    response.status(200).json({message: 'Cavaleiro adicionado com sucesso!'})
                }
            )
        })
    }

    get(request: Request, response: Response) {
        const { cavaleiro_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM cavaleiro WHERE cavaleiro_id = ?',
                [cavaleiro_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar cavaleiro"})
                    }
                    response.status(200).json({message: 'Cavaleiro encontrado com sucesso!', cavaleiro: result})
                }
            )
        })
    }

    getAll(request: Request, response: Response) {
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM cavaleiro',
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar lista de cavaleiros"})
                    }
                    response.status(200).json({message: 'Lista de cavaleiros retornada com sucesso!', cavaleiro: result})
                }
            )
        })
    }

    delete(request: Request, response: Response) {
        const { cavaleiro_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'DELETE FROM cavaleiro WHERE cavaleiro_id = ?',
                [cavaleiro_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao excluir cavaleiro"})
                    }
                    response.status(200).json({message: 'Cavaleiro excluído com sucesso!'})
                }
            )
        })
    }

    update(request: Request, response: Response) {
        const { cavaleiro_id, ...updates } = request.body;
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
            params.push(cavaleiro_id);
            const updateQuery = `UPDATE cavaleiro SET ${updateFields.join(', ')} WHERE cavaleiro_id = ?`;
            connection.query(
                updateQuery,
                params,
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao editar cavaleiro"})
                    }
                    response.status(200).json({message: 'Cavaleiro editado com sucesso!'})
                }
            )
        })
    }

}

export { CavaleiroRepository }