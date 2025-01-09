import express, {Express} from 'express';
import { createServer } from 'node:http';
import rootRouter from './routers/index';
import cors from 'cors';

export const app:Express = express();
export const server = createServer(app);

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use('/', rootRouter)

server.listen(3001, () => {
    console.log('Server api started on port 3001');
});
