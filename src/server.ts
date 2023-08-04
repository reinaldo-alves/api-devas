import express from 'express';
import { config } from 'dotenv';
import { userRoutes } from './routes/user.routes';
import { mediumRoutes } from './routes/medium.routes';
import { falangeRoutes } from './routes/falange.routes';
import { ministroRoutes } from './routes/ministro.routes';
import { guiaRoutes } from './routes/guia.routes';
import { cavaleiroRoutes } from './routes/cavaleiro.routes';
import { adjuntoRoutes } from './routes/adjunto.routes';
import { temploRoutes } from './routes/templo.routes';

config();
const app = express();

app.use(express.json());
app.use('/user', userRoutes);
app.use('/medium', mediumRoutes);
app.use('/falange', falangeRoutes);
app.use('/ministro', ministroRoutes);
app.use('/guia', guiaRoutes);
app.use('/cavaleiro', cavaleiroRoutes);
app.use('/adjunto', adjuntoRoutes);
app.use('/templo', temploRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})