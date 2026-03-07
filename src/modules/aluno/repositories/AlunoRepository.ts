import { Request, Response } from 'express';
import { pool } from '../../../mysql';


class AlunoRepository {
    add(request: Request, response: Response){
        const { medium, med, curso, freq } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'INSERT INTO aluno (medium, med, curso, freq) VALUES (?,?,?,?)',
                [medium, med, curso, freq],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao adicionar aluno em curso", data: error})
                    }
                    response.status(200).json({message: 'Aluno adicionado com sucesso em curso!'})
                }
            )
        })
    }

    get(request: Request, response: Response) {
        const { curso } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM aluno WHERE curso = ?',
                [curso],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar lista de alunos do curso"})
                    }
                    response.status(200).json({message: 'Lista de alunos do curso encontrada com sucesso!', list: result})
                }
            )
        })
    }

    getAll(request: Request, response: Response) {
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM aluno',
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar lista de alunos"})
                    }
                    response.status(200).json({message: 'Lista de alunos retornada com sucesso!', list: result})
                }
            )
        })
    }

    updateFreq(request: Request, response: Response) {
        const { aluno_id, freq } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'UPDATE aluno SET freq = ? WHERE aluno_id = ?',
                [freq, aluno_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao atualizar a frequência do aluno no curso"})
                    }
                    response.status(200).json({message: 'Frequência do aluno no curso atualizada com sucesso!'})
                }
            )
        })
    }

    updateMed(request: Request, response: Response) {
        const { aluno_id, med } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'UPDATE aluno SET med = ? WHERE aluno_id = ?',
                [med, aluno_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao atualizar a mediunidade do aluno"})
                    }
                    response.status(200).json({message: 'Mediunidade do aluno atualizada com sucesso!'})
                }
            )
        })
    }

    delete(request: Request, response: Response) {
        const { aluno_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'DELETE FROM aluno WHERE aluno_id = ?',
                [aluno_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao excluir aluno do curso"})
                    }
                    response.status(200).json({message: 'Aluno excluído com sucesso do curso!'})
                }
            )
        })
    }

}

export { AlunoRepository }