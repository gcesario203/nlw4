import express from 'express';
import 'reflect-metadata';
import createConnection from './database'
import {RoutesHandler} from './routes'

createConnection();
const app = express();
const routes = new RoutesHandler();

app.use(express.json())
app.use(routes.init())

export {app}