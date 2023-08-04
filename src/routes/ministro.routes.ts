import { Router } from 'express';
import { MinistroRepository } from '../modules/ministro/repositories/MinistroRepository';
import { login } from '../middleware/login';

const ministroRoutes = Router();
const ministroRepository = new MinistroRepository();

ministroRoutes.post('/create', login, (request, response) => {
    ministroRepository.create(request, response);
})

ministroRoutes.get('/get', login, (request, response) => {
    ministroRepository.get(request, response)
})

ministroRoutes.get('/get-ministros', login, (request, response) => {
    ministroRepository.getAll(request, response)
})

ministroRoutes.delete('/delete', login, (request, response) => {
    ministroRepository.delete(request, response)
})

ministroRoutes.put('/update', login, (request, response) => {
    ministroRepository.update(request, response)
})

export { ministroRoutes }