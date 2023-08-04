import { Router } from 'express';
import { AdjuntoRepository } from '../modules/adjunto/repositories/AdjuntoRepository';

const adjuntoRoutes = Router();
const adjuntoRepository = new AdjuntoRepository;

adjuntoRoutes.post('/create', (request, response) => {
    adjuntoRepository.create(request, response);
})

adjuntoRoutes.get('/get', (request, response) => {
    adjuntoRepository.get(request, response)
})

adjuntoRoutes.get('/get-adjuntos', (request, response) => {
    adjuntoRepository.getAll(request, response)
})

adjuntoRoutes.delete('/delete', (request, response) => {
    adjuntoRepository.delete(request, response)
})

adjuntoRoutes.put('/update', (request, response) => {
    adjuntoRepository.update(request, response)
})

export { adjuntoRoutes }