import 'dotenv/config';
import errorHandler from './middleware/ErrorHandingMiddleware.js'
import { User, Application } from './models/models.js';
import router from './routers/index.js'
import sequelise from './db/db.js';
import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

const startApp = async () => {
    try {
        await sequelise.authenticate();
        await sequelise.sync();
        app.listen(PORT, () => console.log(`Stared server in a ${PORT}`));
    } catch(e) {
        console.log(e)
    }
};

startApp();