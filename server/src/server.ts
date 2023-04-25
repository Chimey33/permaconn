import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', router);

app.use((err, req, res) => {
    res.json({message: `An error occurred: ${err.message}`})
});

export default app;