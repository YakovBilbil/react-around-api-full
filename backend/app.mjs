import express from "express";
import router from "./routes/index.mjs";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import { mongoServerAddress, limiter } from "./utils/config.mjs"
import { requestLogger, errorLogger } from "./middlewares/logger.mjs"
import { errors } from "celebrate";
import cors from "cors";
import 'dotenv/config';

mongoose.connect(mongoServerAddress);

const app = express();
const { PORT = 3000 } = process.env;

app.use(helmet());

app.use(limiter);

app.use(bodyParser.json());

app.use(cors());


app.options('*', cors());

app.get('/crash-test', () => {
    setTimeout(() => {
        throw new Error('Server will crash now');
    }, 0);
});


app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
    res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT);