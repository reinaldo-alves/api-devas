import { Router } from "express";
import { MediumRepository } from "../modules/medium/repositories/MediumRepository";

const mediumRoutes = Router();
const mediumRepository = new MediumRepository
import { login } from '../middleware/login';

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

export { mediumRoutes }

