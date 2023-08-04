import { Router } from 'express';
import { GuiaRepository } from '../modules/guia/repositories/GuiaRepository';
import { login } from '../middleware/login';

const guiaRoutes = Router();
const guiaRepository = new GuiaRepository();

guiaRoutes.post('/create', login, (request, response) => {
    guiaRepository.create(request, response);
})

guiaRoutes.get('/get', login, (request, response) => {
    guiaRepository.get(request, response)
})

guiaRoutes.get('/get-guias', login, (request, response) => {
    guiaRepository.getAll(request, response)
})

guiaRoutes.delete('/delete', login, (request, response) => {
    guiaRepository.delete(request, response)
})

guiaRoutes.put('/update', login, (request, response) => {
    guiaRepository.update(request, response)
})

export { guiaRoutes }