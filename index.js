import chalk from "chalk";
import os from "os";
import dotenv from "dotenv";
import express from 'express'
import cors from 'cors'
import users from "./usersRouter.js";
import bodyParser from 'body-parser'
import mongoose from "mongoose";

// connect ro db (MongoDB)
// main().catch(err => console.log(err))
//
// async function main() {
//     await mongoose.connect('mongodb://localhost:27017/patients');
// }

// params
const port = 7500
const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
dotenv.config()
app.use(cors())

// routers
app.use('/users', users)
app.get('/', async (req, res) => {
    res.send(`<h1>HOME PAGE</h1>`)
})
app.get('/tasks', async (req, res) => {
    res.send('TASKS')
})

// default
app.use(async (req, res) => {
    res.send('404 NOT FOUND')
})

console.clear()
console.log(chalk.greenBright('===== SERVER STARTED ====='))
console.log(chalk.blueBright('PROCESS №:', chalk.cyanBright(process.pid)))
console.log(chalk.blueBright('PORT:'), chalk.cyanBright(process.env.PORT))
console.log(chalk.blueBright('MODE:'), chalk.cyanBright(process.env.NODE_ENV))
console.log(chalk.blueBright('OS:'), chalk.cyanBright(os.platform()))
console.log(chalk.blueBright("CPU's"), chalk.cyanBright(os.cpus().length))

app.listen(port, () => {
    console.log(chalk.greenBright(`===== SERVER IS RUNNING... =====`))
})




