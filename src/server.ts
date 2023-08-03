import express from 'express';
import { userRoutes } from './routes/user.routes';
import { mediumRoutes } from './routes/medium.routes';
import { config } from 'dotenv';

config();
const app = express();

app.use(express.json());
app.use('/user', userRoutes);
app.use('/medium', mediumRoutes);

const port = process.env.PORT || 4000;

app.get('/', (req: any, res: any) => {
    res.send("Bem vindo à API Devas!");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})