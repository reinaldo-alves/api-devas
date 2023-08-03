import { Request, Response } from 'express';
import { pool } from '../../../mysql';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

class UserRepository {
    create(request: Request, response: Response){
        const { name, password, level, medium_id } = request.body;
        pool.getConnection((err:any, connection:any) => {
            hash(password, 10, (err, hash) => {
                if(err) {
                    return response.status(500).json(err)
                }
                connection.query(
                    'INSERT INTO user (name, password, level, medium_id) VALUES (?,?,?,?)',
                    [name, hash, level, medium_id],
                    (error:any, result:any, fileds:any) => {
                        connection.release();
                        if (error) {
                            return response.status(400).json({error: "Erro na sua autenticação!"})
                        }
                        response.status(200).json({message: 'Usuário adicionado com sucesso!'})
                    }
                )
            })
        })
    }

    login(request: Request, response: Response){
        const { name, password } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM user WHERE name = ?',
                [name],
                (error:any, results:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({message: "Erro na sua autenticação!"})
                    }
                    if (!results[0]){
                        return response.status(202).json({message: "Usuário não cadastrado"})
                    }
                    compare(password, results[0].password, (err, result) => {
                        if (err) {
                            return response.status(400).json({error: "Erro na sua autenticação!"})
                        }
                        if(result) {
                            const token = sign({
                                id: results[0].user_id,
                                name: results[0].name
                            }, process.env.SECRET as string, {expiresIn: "1d"})
                            return response.status(200).json({token: token, message: "Autenticado com sucesso!"})
                        } else {
                            return response.status(200).json({message: "Senha incorreta"})
                        }
                    })
                }
            )
        })
    }

    get(request: Request, response: Response) {
        const { user_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM user WHERE user_id = ?',
                [user_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar usuário"})
                    }
                    response.status(200).json({message: 'Usuário encontrado com sucesso!', user: result})
                }
            )
        })
    }

    getAll(request: Request, response: Response) {
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'SELECT * FROM user',
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar lista de usuários"})
                    }
                    response.status(200).json({message: 'Lista de usuários retornada com sucesso!', user: result})
                }
            )
        })
    }

    delete(request: Request, response: Response) {
        const { user_id } = request.query;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'DELETE FROM user WHERE user_id = ?',
                [user_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao excluir usuário"})
                    }
                    response.status(200).json({message: 'Usuário excluído com sucesso!'})
                }
            )
        })
    }

    update(request: Request, response: Response) {
        const { user_id, name, level } = request.body;
        pool.getConnection((err:any, connection:any) => {
            connection.query(
                'UPDATE user SET name = ?, level = ? WHERE user_id = ?',
                [name, level, user_id],
                (error:any, result:any, fileds:any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({error: "Erro ao editar usuário"})
                    }
                    response.status(200).json({message: 'Usuário editado com sucesso!'})
                }
            )
        })
    }

    updatePassword(request: Request, response: Response) {
        const { user_id, password } = request.body;
        pool.getConnection((err:any, connection:any) => {
            hash(password, 10, (err, hash) => {
                if(err) {
                    return response.status(500).json(err)
                }
                connection.query(
                    'UPDATE user SET password = ? WHERE user_id = ?',
                    [hash, user_id],
                    (error:any, result:any, fileds:any) => {
                        connection.release();
                        if (error) {
                            return response.status(400).json({error: "Erro ao alterar senha"})
                        }
                        response.status(200).json({message: 'Senha alterada com sucesso!'})
                    }
                )
            })  
        })
    }

}

export { UserRepository }