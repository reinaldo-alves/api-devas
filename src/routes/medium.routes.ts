import { Router } from "express";
import { MediumRepository } from "../modules/medium/repositories/MediumRepository";
import { login } from '../middleware/login';
import { localUpload, remoteUpload } from "../middleware/upload";

const mediumRoutes = Router();
const mediumRepository = new MediumRepository

mediumRoutes.post('/create', login, (request, response) => {
    mediumRepository.create(request, response)
})

mediumRoutes.get('/get', login, (request, response) => {
    mediumRepository.get(request, response)
})

mediumRoutes.get('/get-mediuns', login, (request, response) => {
    mediumRepository.getAll(request, response)
})

mediumRoutes.delete('/delete', login, (request, response) => {
    mediumRepository.delete(request, response)
})

mediumRoutes.put('/update', login, (request, response) => {
    mediumRepository.update(request, response)
})

mediumRoutes.post('/upload-image', login, process.env.ENVIRONMENT === 'local' ? localUpload.single('image') : remoteUpload, async (request, response) => {
    mediumRepository.uploadImage(request, response)
})

export { mediumRoutes }

