import { Router } from 'express';
import { MinistroRepository } from '../modules/ministro/repositories/MinistroRepository';

const ministroRoutes = Router();
const ministroRepository = new MinistroRepository();

ministroRoutes.post('/create', (request, response) => {
    ministroRepository.create(request, response);
})

ministroRoutes.get('/get', (request, response) => {
    ministroRepository.get(request, response)
})

ministroRoutes.get('/get-ministros', (request, response) => {
    ministroRepository.getAll(request, response)
})

ministroRoutes.delete('/delete', (request, response) => {
    ministroRepository.delete(request, response)
})

ministroRoutes.put('/update', (request, response) => {
    ministroRepository.update(request, response)
})

export { ministroRoutes }