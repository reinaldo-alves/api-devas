import { Router } from "express";
import { PajeRepository } from "../modules/paje/repositories/PajeRepository";

const pajeRoutes = Router();
const pajeRepository = new PajeRepository
import { login } from '../middleware/login';

pajeRoutes.post('/create', login, (request, response) => {
    pajeRepository.create(request, response)
})

pajeRoutes.get('/get', login, (request, response) => {
    pajeRepository.get(request, response)
})

pajeRoutes.get('/get-paje', login, (request, response) => {
    pajeRepository.getAll(request, response)
})

pajeRoutes.delete('/delete', login, (request, response) => {
    pajeRepository.delete(request, response)
})

pajeRoutes.delete('/delete-comp', login, (request, response) => {
    pajeRepository.deleteComp(request, response)
})

pajeRoutes.put('/update', login, (request, response) => {
    pajeRepository.update(request, response)
})

export { pajeRoutes }

