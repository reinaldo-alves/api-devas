import { Router } from 'express';
import { CalendarRepository } from '../modules/calendar/repositories/CalendarRepository';
import { login } from '../middleware/login';

const calendarRoutes = Router();
const calendarRepository = new CalendarRepository();

calendarRoutes.post('/update', login, (request, response) => {
    calendarRepository.update(request, response)
})

calendarRoutes.get('/get', login, (request, response) => {
    calendarRepository.get(request, response)
})

export { calendarRoutes }