import { Router } from 'express';
import { CursoRepository } from '../modules/curso/repositories/CursoRepository';
import { login } from '../middleware/login';

const cursoRoutes = Router();
const cursoRepository = new CursoRepository;

cursoRoutes.post('/create', login, (request, response) => {
    cursoRepository.create(request, response);
})

cursoRoutes.get('/get', login, (request, response) => {
    cursoRepository.get(request, response)
})

cursoRoutes.get('/get-cursos', login, (request, response) => {
    cursoRepository.getAll(request, response)
})

cursoRoutes.delete('/delete', login, (request, response) => {
    cursoRepository.delete(request, response)
})

cursoRoutes.put('/update', login, (request, response) => {
    cursoRepository.update(request, response)
})

export { cursoRoutes }