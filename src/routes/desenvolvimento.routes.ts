import { Router } from 'express';
import { DesenvolvimentoRepository } from '../modules/desenvolvimento/repositories/DesenvolvimentoRepository';
import { login } from '../middleware/login';

const desenvolvimentoRoutes = Router();
const desenvolvimentoRepository = new DesenvolvimentoRepository();

desenvolvimentoRoutes.post('/update', login, (request, response) => {
    desenvolvimentoRepository.update(request, response)
})

desenvolvimentoRoutes.get('/get', login, (request, response) => {
    desenvolvimentoRepository.get(request, response)
})

desenvolvimentoRoutes.get('/get-desenvolvimento', login, (request, response) => {
    desenvolvimentoRepository.getAll(request, response)
})

export { desenvolvimentoRoutes }