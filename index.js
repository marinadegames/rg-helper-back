import express from "express";
import path, {dirname} from "path";
import cool from 'cool-ascii-faces'
import {fileURLToPath} from 'url';
import dotenv from 'dotenv'
import Pool from "pg-pool";

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
            const result = await client.query('SELECT * FROM test_table');
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
    .get('/times', (req, res) => {
        res.send(showTimes())
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
// example (old code): todo: need delete in future

// import chalk from "chalk";
// import os from "os";
// import dotenv from "dotenv";
// import express from 'express'
// import cors from 'cors'
// import users from "./usersRouter.js";
// import bodyParser from 'body-parser'
// import mongoose from "mongoose";
//
// // params
// dotenv.config()
// const port = 8888
// const app = express()
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())
// app.use(cors())
//
// // connect ro database
// async function main() {
//     await mongoose.connect('mongodb://localhost:27017/patients');
// }
//
// main().catch(err => console.log(err))
//
//
// // routers
// app.use('/users', users)
// app.get('/', async (req, res) => {
//     res.send(`<h1>HOME PAGE</h1>`)
// })
// app.get('/tasks', async (req, res) => {
//     res.send('TASKS')
// })
//
// // default
// app.use(async (req, res) => {
//     res.send('404 NOT FOUND')
// })
//
// console.clear()
// console.log(chalk.greenBright('===== SERVER STARTED ====='))
// console.log(chalk.blueBright('PROCESS №:', chalk.cyanBright(process.pid)))
// console.log(chalk.blueBright('PORT:'), chalk.cyanBright(port))
// console.log(chalk.blueBright('OS:'), chalk.cyanBright(os.platform()))
// console.log(chalk.blueBright("CPU's"), chalk.cyanBright(os.cpus().length))
//
// app.listen(port, () => {
//     console.log(chalk.greenBright(`===== SERVER IS RUNNING... =====`))
// })
//
//


