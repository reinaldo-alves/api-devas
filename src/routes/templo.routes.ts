import { Router } from 'express';
import { TemploRepository } from '../modules/templo/repositories/TemploRepository';
import { login } from '../middleware/login';

const temploRoutes = Router();
const temploRepository = new TemploRepository;

temploRoutes.post('/create', login, (request, response) => {
    temploRepository.create(request, response);
})

temploRoutes.get('/get', login, (request, response) => {
    temploRepository.get(request, response)
})

temploRoutes.get('/get-templos', login, (request, response) => {
    temploRepository.getAll(request, response)
})

temploRoutes.delete('/delete', login, (request, response) => {
    temploRepository.delete(request, response)
})

temploRoutes.put('/update', login, (request, response) => {
    temploRepository.update(request, response)
})

export { temploRoutes }