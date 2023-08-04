import { Router } from 'express';
import { AdjuntoRepository } from '../modules/adjunto/repositories/AdjuntoRepository';
import { login } from '../middleware/login';

const adjuntoRoutes = Router();
const adjuntoRepository = new AdjuntoRepository;

adjuntoRoutes.post('/create', login, (request, response) => {
    adjuntoRepository.create(request, response);
})

adjuntoRoutes.get('/get', login, (request, response) => {
    adjuntoRepository.get(request, response)
})

adjuntoRoutes.get('/get-adjuntos', login, (request, response) => {
    adjuntoRepository.getAll(request, response)
})

adjuntoRoutes.delete('/delete', login, (request, response) => {
    adjuntoRepository.delete(request, response)
})

adjuntoRoutes.put('/update', login, (request, response) => {
    adjuntoRepository.update(request, response)
})

export { adjuntoRoutes }