import { Router } from "express";
import { AlunoRepository } from "../modules/aluno/repositories/AlunoRepository";
import { login } from '../middleware/login';
import { localUpload, remoteUpload } from "../middleware/upload";

const alunoRoutes = Router();
const alunoRepository = new AlunoRepository

alunoRoutes.post('/add', login, (request, response) => {
    alunoRepository.add(request, response)
})

alunoRoutes.get('/get', login, (request, response) => {
    alunoRepository.get(request, response)
})

alunoRoutes.get('/get-alunos', login, (request, response) => {
    alunoRepository.getAll(request, response)
})

alunoRoutes.delete('/delete', login, (request, response) => {
    alunoRepository.delete(request, response)
})

alunoRoutes.put('/update-freq', login, (request, response) => {
    alunoRepository.updateFreq(request, response)
})

alunoRoutes.put('/update-med', login, (request, response) => {
    alunoRepository.updateMed(request, response)
})

export { alunoRoutes }

