import express from 'express';
import routes from './routes';
import { serverPort } from './config';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', routes);

app.listen(serverPort, () => {
  console.log(`Server up & running at http://localhost:${serverPort}`);
});

export default app;
