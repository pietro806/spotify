import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import endpoints from './controller/indexController.js';

const server = express()

server.use(cors())
server.use(express.json())
server.use(endpoints) 


server.listen(process.env.PORT,
    () => console.log('API online na porta ' + process.env.PORT))