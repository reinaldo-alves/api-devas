import { Router } from 'express';
import { GuiaRepository } from '../modules/guia/repositories/GuiaRepository';

const guiaRoutes = Router();
const guiaRepository = new GuiaRepository();

guiaRoutes.post('/create', (request, response) => {
    guiaRepository.create(request, response);
})

guiaRoutes.get('/get', (request, response) => {
    guiaRepository.get(request, response)
})

guiaRoutes.get('/get-guias', (request, response) => {
    guiaRepository.getAll(request, response)
})

guiaRoutes.delete('/delete', (request, response) => {
    guiaRepository.delete(request, response)
})

guiaRoutes.put('/update', (request, response) => {
    guiaRepository.update(request, response)
})

export { guiaRoutes }