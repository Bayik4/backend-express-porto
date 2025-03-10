import express from 'express';
import cors from 'cors';
import rootRouter from './routers/index.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', rootRouter);

app.listen(PORT, (err) => {
    if(err) console.log(err);
    console.log(`Server run on http://localhost:${PORT}`);
})