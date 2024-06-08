import 'dotenv/config';
import errorHandler from './middleware/ErrorHandingMiddleware.js'
import { User, Application, Token } from './models/models.js';
import cookieParser from 'cookie-parser';
import router from './routers/index.js'
import sequelise from './db/db.js';
import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors({
    credentials: true,
    origin: [process.env.CLIENT_URL]
}));
app.use(cookieParser());
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