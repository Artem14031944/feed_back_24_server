import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

const startApp = async () => {
    try {
        app.listen(PORT, () => console.log(`Stared server in a ${PORT}`));
    } catch(e) {
        console.log(e)
    }
};

startApp();