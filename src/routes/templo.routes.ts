import { Router } from 'express';
import { TemploRepository } from '../modules/templo/repositories/TemploRepository';

const temploRoutes = Router();
const temploRepository = new TemploRepository;

temploRoutes.post('/create', (request, response) => {
    temploRepository.create(request, response);
})

temploRoutes.get('/get', (request, response) => {
    temploRepository.get(request, response)
})

temploRoutes.get('/get-templos', (request, response) => {
    temploRepository.getAll(request, response)
})

temploRoutes.delete('/delete', (request, response) => {
    temploRepository.delete(request, response)
})

temploRoutes.put('/update', (request, response) => {
    temploRepository.update(request, response)
})

export { temploRoutes }