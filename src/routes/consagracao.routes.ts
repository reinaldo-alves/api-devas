import { Router } from 'express';
import { ConsagracaoRepository } from '../modules/consagracao/repositories/ConsagracaoRepository';
import { login } from '../middleware/login';

const consagracaoRoutes = Router();
const consagracaoRepository = new ConsagracaoRepository();

consagracaoRoutes.post('/add', login, (request, response) => {
    consagracaoRepository.add(request, response);
})

consagracaoRoutes.get('/get-by-cons', login, (request, response) => {
    consagracaoRepository.getByCons(request, response)
})

consagracaoRoutes.get('/get-consagracoes', login, (request, response) => {
    consagracaoRepository.getAll(request, response)
})

consagracaoRoutes.delete('/delete', login, (request, response) => {
    consagracaoRepository.delete(request, response)
})

consagracaoRoutes.put('/next-cons', login, (request, response) => {
    consagracaoRepository.nextCons(request, response)
})

export { consagracaoRoutes }