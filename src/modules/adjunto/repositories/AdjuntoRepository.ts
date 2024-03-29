import { Request, Response } from 'express';
import { pool } from '../../../mysql';

class AdjuntoRepository {
    create(request: Request, response: Response){
        const { nome, ministro, classif, esperanca } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'INSERT INTO adjunto (nome, ministro, classif, esperanca) VALUES (?,?,?,?)',
                [nome, ministro, classif, esperanca],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao adicionar adjunto"})
                    }
                    response.status(200).json({message: 'Adjunto adicionado com sucesso!'})
                }
            )
        })
    }

    get(request: Request, response: Response) {
        const { adjunto_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM adjunto WHERE adjunto_id = ?',
                [adjunto_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar adjunto"})
                    }
                    response.status(200).json({message: 'Adjunto encontrado com sucesso!', adjunto: result})
                }
            )
        })
    }

    getAll(request: Request, response: Response) {
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM adjunto',
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar lista de adjuntos"})
                    }
                    response.status(200).json({message: 'Lista de adjuntos retornada com sucesso!', adjunto: result})
                }
            )
        })
    }

    delete(request: Request, response: Response) {
        const { adjunto_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'DELETE FROM adjunto WHERE adjunto_id = ?',
                [adjunto_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao excluir adjunto"})
                    }
                    response.status(200).json({message: 'Adjunto excluído com sucesso!'})
                }
            )
        })
    }

    update(request: Request, response: Response) {
        const { adjunto_id, ...updates } = request.body;
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
            params.push(adjunto_id);
            const updateQuery = `UPDATE adjunto SET ${updateFields.join(', ')} WHERE adjunto_id = ?`;
            connection.query(
                updateQuery,
                params,
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao editar adjunto"})
                    }
                    response.status(200).json({message: 'Adjunto editado com sucesso!'})
                }
            )
        })
    }

}

export { AdjuntoRepository }