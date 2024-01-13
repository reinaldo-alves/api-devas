import { Router } from "express";
import { BackupRepository } from "../modules/backup/repositories/BackupRepository";
import { login } from '../middleware/login';
import multer from 'multer';
import path from 'path';

const backupRoutes = Router();
const backupRepository = new BackupRepository
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (request: any, file: any, callback: any) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.sql') {
            return callback(null, false);
        }
        return callback(null, true);
    }
});

backupRoutes.get('/create', login, (request, response) => {
    backupRepository.create(request, response)
})

backupRoutes.post('/restore', login, upload.single('backupFile'), (request, response) => {
    backupRepository.restore(request, response)
})

export { backupRoutes }

