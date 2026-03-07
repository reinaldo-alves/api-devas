import { Router } from 'express';
import { InstrutorRepository } from '../modules/instrutor/repositories/InstrutorRepository';
import { login } from '../middleware/login';

const instrutorRoutes = Router();
const instrutorRepository = new InstrutorRepository;

instrutorRoutes.post('/create', login, (request, response) => {
    instrutorRepository.create(request, response);
})

instrutorRoutes.get('/get', login, (request, response) => {
    instrutorRepository.get(request, response)
})

instrutorRoutes.get('/get-instrutores', login, (request, response) => {
    instrutorRepository.getAll(request, response)
})

instrutorRoutes.delete('/delete', login, (request, response) => {
    instrutorRepository.delete(request, response)
})

instrutorRoutes.put('/update', login, (request, response) => {
    instrutorRepository.update(request, response)
})

export { instrutorRoutes }