import { Router } from 'express';
import { CavaleiroRepository } from '../modules/cavaleiro/repositories/CavaleiroRepository';

const cavaleiroRoutes = Router();
const cavaleiroRepository = new CavaleiroRepository();

cavaleiroRoutes.post('/create', (request, response) => {
    cavaleiroRepository.create(request, response);
})

cavaleiroRoutes.get('/get', (request, response) => {
    cavaleiroRepository.get(request, response)
})

cavaleiroRoutes.get('/get-cavaleiros', (request, response) => {
    cavaleiroRepository.getAll(request, response)
})

cavaleiroRoutes.delete('/delete', (request, response) => {
    cavaleiroRepository.delete(request, response)
})

cavaleiroRoutes.put('/update', (request, response) => {
    cavaleiroRepository.update(request, response)
})

export { cavaleiroRoutes }