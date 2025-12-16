import { Request, Response } from 'express';
import { pool } from '../../../mysql';
import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

class UserRepository {
    create(request: Request, response: Response){
        const { name, password, level, medium_id, sex } = request.body;
        pool.getConnection((err:any, connection:any) => {
            hash(password, 10, (err, hash) => {
                if(err) {
                    return response.status(500).json(err)
                }
                connection.query(
                    'INSERT INTO user (name, password, level, medium_id, sex) VALUES (?,?,?,?,?)',
                    [name, hash, level, medium_id, sex],
                    (error:any, result:any, fileds:any) => {
                        connection.release();
                        if (error) {
                            return response.status(400).json({error: "Erro ao criar novo usuário!"})
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
            if (err || !connection) {
                console.error('Erro ao obter conexão:', err);
                return response.status(500).json({ message: "Erro de conexão com o banco de dados" });
            }
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
                            }, process.env.SECRET as string, {expiresIn: "10h"})
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
        const decode: any = request.headers.authorization? verify(request.headers.authorization, process.env.SECRET as string) : {id: '', name: '', iat: 0, exp: 0};
        if(decode.id){
            pool.getConnection((err:any, connection:any) => {
                connection.query(
                    'SELECT * FROM user WHERE user_id = ?',
                    [decode.id],
                    (error:any, result:any, fileds:any) => {
                        connection.release();
                        if (error) {
                            return response.status(400).send({
                                error: error,
                                message: "Erro ao buscar dados do usuário",
                                response: null
                            })
                        }
                        return response.status(201).send({
                            message: 'Usuário encontrado com sucesso!',
                            user: {
                                user_id: result[0].user_id,
                                name: result[0].name,
                                password: result[0].password,
                                level: result[0].level,
                                meduim_id: result[0].medium_id,
                                sex: result[0].sex
                            }
                        })
                    }
                )
            })
        }
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
        const { user_id, ...updates } = request.body;
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
            params.push(user_id);
            const updateQuery = `UPDATE user SET ${updateFields.join(', ')} WHERE user_id = ?`;
            connection.query(
                updateQuery,
                params,
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

    changePassword(request: Request, response: Response) {
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