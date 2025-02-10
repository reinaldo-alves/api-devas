import { Request, Response } from 'express';
import { exec, ExecException, spawn } from 'child_process';
import fs from 'fs';

const formatTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    
    return `${year}${month}${day}_${hour}${minute}`
}

class BackupRepository {
    create(request: Request, response: Response){
        const filename = `backup_${formatTime()}.sql`;
        const filePath = `./public/backup/${filename}`;
        const command = `mysqldump -h ${process.env.HOST_DATABASE} -u ${process.env.USER_DATABASE} -p${process.env.PASSWORD_DATABASE} ${process.env.DATABASE} --result-file=${filePath}`;
        exec(command, (error: ExecException | null) => {
            if (error) {
                return response.status(500).send({error: "Erro ao criar backup"})
            }
            fs.access(filePath, fs.constants.F_OK, (err) => {
                if(err) {
                    return response.status(500).send({error: "Erro ao gerar o backup"});
                }
                response.download(filePath, filename, (err) => {
                    if(err) {
                        return response.status(500).send({error: "Erro ao enviar backup para download"});
                    }
                    setTimeout(() => {
                        fs.unlink(filePath, (unlinkErr) => {
                            if(unlinkErr) {
                                console.error("Erro ao remover o arquivo de backup: ", unlinkErr);
                            }
                        });
                    }, 5000);
                });
            });
        });
    }

    restore(request: Request, response: Response) {
        const backupFile = request.file;
        if (!backupFile) {
            return response.status(400).json({error: 'Nenhum arquivo enviado'})
        }
        const filename = backupFile.originalname;
        if (backupFile.buffer) {
            const command = `mysql -h ${process.env.HOST_DATABASE} -u ${process.env.USER_DATABASE} -p${process.env.PASSWORD_DATABASE} ${process.env.DATABASE}`;
            const options = {shell: true};
            const mysqlProcess = spawn(command, options);
            let stdout = '';
            let stderr = '';
            mysqlProcess.stdout.on('data', (data) => {stdout = data})
            mysqlProcess.stderr.on('data', (data) => {stderr = data})
            mysqlProcess.on('close', (code) => {
                if (code === 0) {
                    return response.status(200).json({ message: 'Backup restaurado com sucesso', filename: filename });
                } else {
                    return response.status(500).json({ message: "Erro ao restaurar backup", stderr: stderr });
                }
            })
            mysqlProcess.stdin?.write(backupFile.buffer);
            mysqlProcess.stdin?.end(() => {console.log('Envio de dados concluído')});
        } else {
            return response.status(400).json({error: 'Arquivo inválido'});
        }
    }

}

export { BackupRepository }