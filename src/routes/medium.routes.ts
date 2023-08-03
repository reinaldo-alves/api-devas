import { Router } from "express";
import { MediumRepository } from "../modules/medium/repositories/MediumRepository";

const mediumRoutes = Router();
const mediumRepository = new MediumRepository

mediumRoutes.post('/create', (request, response) => {
    mediumRepository.create(request, response)
})

mediumRoutes.get('/get', (request, response) => {
    mediumRepository.get(request, response)
})

mediumRoutes.get('/get-mediuns', (request, response) => {
    mediumRepository.getAll(request, response)
})

mediumRoutes.delete('/delete', (request, response) => {
    mediumRepository.delete(request, response)
})

mediumRoutes.put('/update', (request, response) => {
    mediumRepository.update(request, response)
})

export { mediumRoutes }

