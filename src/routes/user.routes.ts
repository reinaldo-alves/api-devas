import { Router } from 'express';
import { UserRepository } from '../modules/user/repositories/UserRepository';
import { login } from '../middleware/login';

const userRoutes = Router();
const userRepository = new UserRepository();

userRoutes.post('/create', login, (request, response) => {
    userRepository.create(request, response);
})

userRoutes.post('/login', (request, response) => {
    userRepository.login(request, response);
})

userRoutes.get('/get', login, (request, response) => {
    userRepository.get(request, response)
})

userRoutes.get('/get-users', login, (request, response) => {
    userRepository.getAll(request, response)
})

userRoutes.delete('/delete', login, (request, response) => {
    userRepository.delete(request, response)
})

userRoutes.put('/update', login, (request, response) => {
    userRepository.update(request, response)
})

userRoutes.put('/change-password', login, (request, response) => {
    userRepository.changePassword(request, response)
})

export { userRoutes }