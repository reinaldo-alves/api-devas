import { Router } from 'express';
import { CavaleiroRepository } from '../modules/cavaleiro/repositories/CavaleiroRepository';
import { login } from '../middleware/login';

const cavaleiroRoutes = Router();
const cavaleiroRepository = new CavaleiroRepository();

cavaleiroRoutes.post('/create', login, (request, response) => {
    cavaleiroRepository.create(request, response);
})

cavaleiroRoutes.get('/get', login, (request, response) => {
    cavaleiroRepository.get(request, response)
})

cavaleiroRoutes.get('/get-cavaleiros', login, (request, response) => {
    cavaleiroRepository.getAll(request, response)
})

cavaleiroRoutes.delete('/delete', login, (request, response) => {
    cavaleiroRepository.delete(request, response)
})

cavaleiroRoutes.put('/update', login, (request, response) => {
    cavaleiroRepository.update(request, response)
})

export { cavaleiroRoutes }