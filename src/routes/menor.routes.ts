import { Router } from "express";
import { MenorRepository } from "../modules/menor/repositories/MenorRepository";

const menorRoutes = Router();
const menorRepository = new MenorRepository
import { login } from '../middleware/login';
const uploadImgMenor = require('../middleware/upload')

menorRoutes.post('/create', login, (request, response) => {
    menorRepository.create(request, response)
})

menorRoutes.get('/get', login, (request, response) => {
    menorRepository.get(request, response)
})

menorRoutes.get('/get-menor', login, (request, response) => {
    menorRepository.getAll(request, response)
})

menorRoutes.delete('/delete', login, (request, response) => {
    menorRepository.delete(request, response)
})

menorRoutes.put('/update', login, (request, response) => {
    menorRepository.update(request, response)
})

export { menorRoutes }

