import express from "express";
import morgan from 'morgan';
import bodyParser  from 'body-parser';
import path from 'path';
import cors from 'cors';

import { connect } from './helpers/orm';
import { routes as userRoutes } from './routes/user';
import { routes as itemRoutes } from './routes/itemList';

const app: any = express();
const port: string | number = process.env.PORT || 5000;

connect();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/item', itemRoutes);

app.use('*', (request: any, response: any) => {
    response.status(403).json({ error: 'Esse caminho está indisponivel!' });
});

app.listen(port, () => console.log('Listen at port %d', port));
