import { Router } from 'express';
import { FalangeRepository } from '../modules/falange/repositories/FalangeRepository';

const falangeRoutes = Router();
const falangeRepository = new FalangeRepository();

falangeRoutes.get('/get', (request, response) => {
    falangeRepository.get(request, response)
})

falangeRoutes.get('/get-falanges', (request, response) => {
    falangeRepository.getAll(request, response)
})

falangeRoutes.put('/update', (request, response) => {
    falangeRepository.update(request, response)
})

export { falangeRoutes }