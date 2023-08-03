import { Router } from 'express';
import { UserRepository } from '../modules/user/repositories/UserRepository';

const userRoutes = Router();
const userRepository = new UserRepository();

userRoutes.post('/create', (request, response) => {
    userRepository.create(request, response);
})

userRoutes.post('/login', (request, response) => {
    userRepository.login(request, response);
})

userRoutes.get('/get', (request, response) => {
    userRepository.get(request, response)
})

userRoutes.get('/get-users', (request, response) => {
    userRepository.getAll(request, response)
})

userRoutes.delete('/delete', (request, response) => {
    userRepository.delete(request, response)
})

userRoutes.put('/update', (request, response) => {
    userRepository.update(request, response)
})

userRoutes.put('/change-password', (request, response) => {
    userRepository.updatePassword(request, response)
})

export { userRoutes }