import express from "express";
import path, {dirname} from "path";
import {fileURLToPath} from 'url';
import Pool from "pg-pool";
import cors from 'cors'
import router from "./router.js";
import * as dotenv from "dotenv";
import chalk from "chalk";

dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 5000;
export const pool = new Pool({
    connectionString: process.env.HEROKU_POSTGRESQL_AQUA_URL, ssl: {
        rejectUnauthorized: false
    }
});

const app = express()
app.listen(PORT, () => {
    console.group(chalk.greenBright('===================================='))
    console.log(chalk.greenBright(`======= START SERVER ON PORT ${PORT} =======`))
    console.log(chalk.greenBright('===================================='))
    console.groupEnd()
})

app.use(cors())
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// REQUESTS
app.get('/', router)
app.get('/patients', router)
app.get('/patients/:id', router)
app.get('/researches', router)
app.get('/patients/researches/:id', router)
app.get('/*', router)

app.post('/patients', router)
app.post('/patients/researches', router)

app.put('/patients/:id/changeName', router)
app.put('/patients/:id/changeYear', router)
app.put('/patients/:id/changeSex', router)
app.put('/patients/:id/changeAddress', router)
app.put('/patients/researches', router)