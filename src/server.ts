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
import { consagracaoRoutes } from './routes/consagracao.routes';
import { backupRoutes } from './routes/backup.routes';
import { eventoRoutes } from './routes/evento.routes';
import { calendarRoutes } from './routes/calendar.routes';

config();
const app = express();

const cors = require('cors');
const path = require('path');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE, OPTIONS");
    next();
});

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use('/user', userRoutes);
app.use('/medium', mediumRoutes);
app.use('/falange', falangeRoutes);
app.use('/evento', eventoRoutes);
app.use('/ministro', ministroRoutes);
app.use('/guia', guiaRoutes);
app.use('/cavaleiro', cavaleiroRoutes);
app.use('/adjunto', adjuntoRoutes);
app.use('/templo', temploRoutes);
app.use('/consagracao', consagracaoRoutes);
app.use('/backup', backupRoutes);
app.use('/calendar', calendarRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})