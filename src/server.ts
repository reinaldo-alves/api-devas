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
console.log(__dirname);
app.use(express.static(path.join(__dirname, "../public")));

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