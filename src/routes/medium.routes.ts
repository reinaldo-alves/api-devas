import { Router } from "express";
import { MediumRepository } from "../modules/medium/repositories/MediumRepository";

const mediumRoutes = Router();
const mediumRepository = new MediumRepository
import { login } from '../middleware/login';
const uploadImgMedium = require('../middleware/upload')

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

mediumRoutes.post('/upload-image', login, uploadImgMedium.single('image'), async (request, response) => {
    mediumRepository.uploadImage(request, response)
})

export { mediumRoutes }

