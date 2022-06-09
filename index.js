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
        const result = await client.query(
            `SELECT
                patients.id,
                patients.dateres,
                patients.name,
                patients.birthyear,
                patients.sex,
                patients.address,
                (SELECT jsonb_agg(idres) FROM researches WHERE researches.idpatient = patients.resid),
                patients.description,
                patients.conclusion
                FROM researches
                INNER JOIN patients ON patients.resid = researches.idres;
                `);
        const results = {'results': (result) ? result.rows : null};
        res.send(results)
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})
app.get('/patients/:id', async (req, res) => {
    try {
        const id = req.params.id
        const client = await pool.connect();
        const result = await client.query(
            `SELECT *  FROM patients WHERE patients.id = ${id}`);
        const results = {'results': (result) ? result.rows : null};
        res.send(results)
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})

app.get('/patients/researches', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
            `SELECT * FROM researches;`);
        const results = {'results': (result) ? result.rows : null};
        res.send(results)
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})
app.get('/patients/researches/:id', async (req, res) => {
    try {
        const idRes = req.params.id
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM researches WHERE researches.idpatient = '${idRes}';`);
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
