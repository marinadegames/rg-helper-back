import express from "express";
import path, {dirname} from "path";
import {fileURLToPath} from 'url';
import dotenv from 'dotenv'
import Pool from "pg-pool";
import cors from 'cors'

dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 5000;
const pool = new Pool({
    connectionString: process.env.HEROKU_POSTGRESQL_AQUA_URL, ssl: {
        rejectUnauthorized: false
    }
});
const app = express()
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
app.use(cors())
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// REQUESTS
app.get('/', (req, res) => {
    res.write(`<h1>WELCOME!</h1>`)
    res.end()
})

app.get('/patients', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM patients');
        const results = {'results': (result) ? result.rows : null};
        res.send(results)
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})
app.get('/*', (req, res) => {
    res.send(`<h1>404 not found</h1>`)
    res.end()
})
