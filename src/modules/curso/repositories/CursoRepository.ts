import { Request, Response } from 'express';
import { pool } from '../../../mysql';

class CursoRepository {
    create(request: Request, response: Response){
        const { tipo, instrutor, templo, datas, concluido, observ } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'INSERT INTO curso (tipo, instrutor, templo, datas, concluido, observ) VALUES (?,?,?,?,?,?)',
                [tipo, instrutor, templo, datas, concluido, observ],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao adicionar curso"})
                    }
                    response.status(200).json({message: 'Curso adicionado com sucesso!'})
                }
            )
        })
    }

    get(request: Request, response: Response) {
        const { curso_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM curso WHERE curso_id = ?',
                [curso_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar curso"})
                    }
                    response.status(200).json({message: 'Curso encontrado com sucesso!', curso: result})
                }
            )
        })
    }

    getAll(request: Request, response: Response) {
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM curso',
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar lista de cursos"})
                    }
                    response.status(200).json({message: 'Lista de cursos retornada com sucesso!', curso: result})
                }
            )
        })
    }

    delete(request: Request, response: Response) {
        const { curso_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'DELETE FROM curso WHERE curso_id = ?',
                [curso_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao excluir curso"})
                    }
                    response.status(200).json({message: 'Curso excluído com sucesso!'})
                }
            )
        })
    }

    update(request: Request, response: Response) {
        const { curso_id, ...updates } = request.body;
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
            params.push(curso_id);
            const updateQuery = `UPDATE curso SET ${updateFields.join(', ')} WHERE curso_id = ?`;
            connection.query(
                updateQuery,
                params,
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao editar curso"})
                    }
                    response.status(200).json({message: 'Curso editado com sucesso!'})
                }
            )
        })
    }

}

export { CursoRepository }