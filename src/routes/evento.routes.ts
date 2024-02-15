import { Router } from 'express';
import { EventoRepository } from '../modules/evento/repositories/EventoRepository';
import { login } from '../middleware/login';

const eventoRoutes = Router();
const eventoRepository = new EventoRepository();

eventoRoutes.post('/create', login, (request, response) => {
    eventoRepository.create(request, response);
})

eventoRoutes.get('/get', login, (request, response) => {
    eventoRepository.get(request, response)
})

eventoRoutes.get('/get-eventos', login, (request, response) => {
    eventoRepository.getAll(request, response)
})

eventoRoutes.delete('/delete', login, (request, response) => {
    eventoRepository.delete(request, response)
})

eventoRoutes.put('/update', login, (request, response) => {
    eventoRepository.update(request, response)
})

export { eventoRoutes }