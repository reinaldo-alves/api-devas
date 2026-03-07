import { Request, Response } from 'express';
import { pool } from '../../../mysql';

class InstrutorRepository {
    create(request: Request, response: Response){
        const { nome, ministro, cursos} = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'INSERT INTO instrutor (nome, ministro, cursos) VALUES (?,?,?)',
                [nome, ministro, cursos],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao adicionar instrutor"})
                    }
                    response.status(200).json({message: 'Instrutor adicionado com sucesso!'})
                }
            )
        })
    }

    get(request: Request, response: Response) {
        const { instrutor_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM instrutor WHERE instrutor_id = ?',
                [instrutor_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar instrutor"})
                    }
                    response.status(200).json({message: 'Instrutor encontrado com sucesso!', instrutor: result})
                }
            )
        })
    }

    getAll(request: Request, response: Response) {
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM instrutor',
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar lista de instrutores"})
                    }
                    response.status(200).json({message: 'Lista de instrutores retornada com sucesso!', instrutor: result})
                }
            )
        })
    }

    delete(request: Request, response: Response) {
        const { instrutor_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'DELETE FROM instrutor WHERE instrutor_id = ?',
                [instrutor_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao excluir instrutor"})
                    }
                    response.status(200).json({message: 'Instrutor excluído com sucesso!'})
                }
            )
        })
    }

    update(request: Request, response: Response) {
        const { instrutor_id, ...updates } = request.body;
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
            params.push(instrutor_id);
            const updateQuery = `UPDATE instrutor SET ${updateFields.join(', ')} WHERE instrutor_id = ?`;
            connection.query(
                updateQuery,
                params,
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao editar instrutor"})
                    }
                    response.status(200).json({message: 'Instrutor editado com sucesso!'})
                }
            )
        })
    }

}

export { InstrutorRepository }