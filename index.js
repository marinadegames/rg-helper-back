import express from "express";
import path, {dirname} from "path";
import cool from 'cool-ascii-faces'
import {fileURLToPath} from 'url';
import dotenv from 'dotenv'
import Pool from "pg-pool";
import cors from 'cors'

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 5000;
const pool = new Pool({
    connectionString: process.env.HEROKU_POSTGRESQL_AQUA_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

express()
    .use(cors())
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

    .get('/', (req, res) => {
        res.write(`<h1>HOME PAGE</h1>`)
        res.end()
    })
    .get('/db', async (req, res) => {
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM people');
            const results = {'results': (result) ? result.rows : null};
            res.send(results)
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
    .get('/tasks', (req, res) => {
        res.send('TASKS')
        res.end()
    })
    .get('/cool', (req, res) => {
        res.send(cool())
        res.end()
    })
    .get('/*', (req, res) => {
        res.send(`<h1>404 not found</h1>`)
        res.end()
    })
    .listen(PORT, () => {
        console.log(`Listening on ${PORT}`)
    })

const showTimes = () => {
    let result = '';
    const times = process.env.TIMES || 5;
    for (let i = 0; i < times; i++) {
        result += i + ' ';
    }
    return result;
}