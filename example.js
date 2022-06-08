// import express from "express";
// import path, {dirname} from "path";
// import cool from 'cool-ascii-faces'
// import {fileURLToPath} from 'url';
// import dotenv from 'dotenv'
// import Pool from "pg-pool";
// import cors from 'cors'
// import chalk from "chalk";
//
// dotenv.config()
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const PORT = process.env.PORT || 5000;
// const pool = new Pool({
//     connectionString: process.env.HEROKU_POSTGRESQL_AQUA_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });
// const app = express()
// app.listen(PORT, () => {
//     console.log(`Listening on ${PORT}`)
// })
// app
//     .use(cors())
//     .use(express.static(path.join(__dirname, 'public')))
//     .use(express.json())
//
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')
//
// app.get('/', (req, res) => {
//     res.write(`<h1>HOME PAGE</h1>`)
//     res.end()
// })
// app.get('/db', async (req, res) => {
//     try {
//         const client = await pool.connect();
//         const result = await client.query('SELECT * FROM people');
//         const results = {'results': (result) ? result.rows : null};
//         res.send(results)
//         client.release();
//     } catch (err) {
//         console.error(err);
//         res.send("Error " + err);
//     }
// })
// app.get('/tasks', (req, res) => {
//     res.send('TASKS')
//     res.end()
// })
// app.get('/cool', (req, res) => {
//     res.send(cool())
//     res.end()
// })
// app.get('/*', (req, res) => {
//     res.send(`<h1>404 not found</h1>`)
//     res.end()
// })
// app.delete('/:id', async (req, res) => {
//     try {
//         const client = await pool.connect();
//         const result = await client.query(`DELETE FROM people WHERE id = ${req.params.id}`);
//         const results = {'results': (result) ? result.rows : null};
//         res.send(results)
//         console.log('DELETED PATIENT ID:', req.params.id)
//         client.release();
//     } catch (err) {
//         console.error(err);
//         res.send("Error " + err);
//     }
//     res.end()
// })
//
//
// app.post('/db', async (req, res) => {
//     try {
//         let newName = req.body.name
//         console.log({newName})
//         console.log('YES')
//         const client = await pool.connect();
//         const result = await client.query(`INSERT INTO people (name) VALUES ('${newName}')`);
//         const results = {'results': (result) ? result.rows : null};
//         res.send(results)
//         console.log('ADDED NEW USER:', req.body.name)
//         client.release();
//     } catch (err) {
//         console.error(err);
//         res.send("Error " + err);
//     } finally {
//         res.end()
//     }
//
// })
// app.put('/db/:id', async (req, res) => {
//
//     console.log(chalk.blueBright("========================="))
//     console.log(chalk.blueBright("YOU'RE HERE!"))
//     console.log(chalk.blueBright("========================="))
//     try {
//         let userId = req.params.id
//         let user = req.body.user
//         console.log(req.body.user)
//         console.log('USER ID: ', userId)
//
//         const client = await pool.connect();
//         const result = await client.query(
//             `UPDATE people
//             SET
//             name = '${user.name}',
//             bio = '${user.bio}',
//             birth = ${user.birth},
//             email = '${user.email}',
//             covid = ${user.covid}
//             WHERE id = ${userId}
//             `);
//         const results = {'results': (result) ? result.rows : null};
//         res.send(results)
//         console.log('EDIT USER:', req.body.user.name)
//         client.release();
//     } catch (err) {
//         console.error(err);
//         res.send("Error " + err);
//     } finally {
//         res.end()
//     }
//
// })
//
