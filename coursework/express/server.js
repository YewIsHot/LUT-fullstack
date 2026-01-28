import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import posts from './routes/posts.js';
import logger from './middleware/logger.js'
import errorHandler from './middleware/error.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'html')));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(logger);

app.use('/api/posts', posts);

app.get('/secret', (req, res, next) => {
    res.send("<h1>Found a secret!</h1>");
});

app.post('/secret', (req, res, next) => {
    res.send('<h1>Wooow, event better secret!!!</h1>');
});

app.use((req, res, next) => {
    const err = new Error('NoT fOuNd!');
    err.status = 404;
    return next(err);
});

app.use(errorHandler);

app.listen(8080, () =>
{
    console.log('Server is running');
});