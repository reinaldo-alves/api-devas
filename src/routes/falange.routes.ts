import { Router } from 'express';
import { FalangeRepository } from '../modules/falange/repositories/FalangeRepository';
import { login } from '../middleware/login';

const falangeRoutes = Router();
const falangeRepository = new FalangeRepository();

falangeRoutes.get('/get', login, (request, response) => {
    falangeRepository.get(request, response)
})

falangeRoutes.get('/get-falanges', login, (request, response) => {
    falangeRepository.getAll(request, response)
})

falangeRoutes.put('/update', login, (request, response) => {
    falangeRepository.update(request, response)
})

export { falangeRoutes }