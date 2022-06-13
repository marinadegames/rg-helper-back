import {pool} from "./index.js";
import chalk from "chalk";

class PatientController {
    async home(req, res) {
        res.write(`<h1>WELCOME!</h1>`)
        res.end()
    }

    async getAllPatients(req, res) {
        try {
            const client = await pool.connect();
            const result = await client.query(
                `
                SELECT
                patients.id,
                patients.dateres,
                patients.name,
                patients.birthyear,
                patients.sex,
                patients.address,
                 (SELECT jsonb_agg(idres) FROM researches WHERE researches.idpatient = patients.id),
                patients.description,
                patients.conclusion
                FROM patients
                ORDER BY patients.id;
                `);
            const results = {'results': (result) ? result.rows : null};
            res.send(results)
            client.release();
        } catch (err) {
            res.status(400)
            console.error(err);
            res.send("Error " + err);
        }
    }

    async getTargetPatient(req, res) {
        try {
            const id = req.params.id
            const client = await pool.connect();
            const result = await client.query(
                `SELECT *  FROM patients WHERE patients.id = ${id}`);
            const results = {'results': (result) ? result.rows : null};
            res.send(results)
            client.release();
        } catch (err) {
            res.status(400)
            console.error(err);
            res.send("Error " + err);
        }
    }

    async getTargetResearchesPatient(req, res) {
        try {
            const idRes = req.params.id
            const client = await pool.connect();
            const result = await client.query(`SELECT * FROM researches WHERE researches.idpatient = '${idRes}';`);
            const results = {'results': (result) ? result.rows : null};
            res.send(results)
            client.release();
        } catch (err) {
            res.status(400)
            console.error(err);
            res.send("Error " + err);
        }
    }

    async notFound(req, res) {
        res.send(`<h1>404 not found</h1>`)
        res.status(400)
        res.end()
    }

    async postNewPatient(req, res) {
        try {
            const newPatient = req.body
            const client = await pool.connect();
            const result = await client.query(
                `
                INSERT INTO patients (name, birthyear, sex, address, dateres)
                VALUES ('${newPatient.name}', '${newPatient.year}', '${newPatient.sex}', '${newPatient.address}', CURRENT_TIMESTAMP);
                `
            );
            const results = {'results': (result) ? result.rows : null};
            res.send(results)
            client.release();
        } catch (err) {
            res.status(400)
            console.error(err);
            res.send("Error " + err);
        }
    }

    async postNewResearches(req, res) {
        try {
            const newResearches = req.body
            const client = await pool.connect();
            const exp = newResearches.res.map(res => {
                return `('${res.typeres}', '${res.sizefilm}', '${res.amount}', '${res.projections}', '${res.dose}', '${res.idpatient}')`
            })
            const expSQL = 'INSERT INTO researches ' +
                '(typeres, sizefilm, amount, projections, dose, idpatient) ' +
                'VALUES ' + exp.toString() + ';'
            console.log(chalk.cyan(expSQL))
            const result = await client.query(expSQL);
            const results = {'results': (result) ? result.rows : null};
            res.send(results)
            client.release();
        } catch (err) {
            res.status(400)
            console.error(err);
            res.send("Error " + err);
        }
    }

    async putEditPatientName(req, res) {
        try {
            const patientId = req.params.id
            const newName = req.body.name
            console.log(typeof req.body.name)
            console.log(req.body)
            const client = await pool.connect();
            const result = await client.query(`UPDATE patients SET name = '${newName}' WHERE id = ${patientId};`);
            const results = {'results': (result) ? result.rows : null};
            res.send(results)
            client.release();
        } catch (err) {
            res.status(400)
            console.error(err);
            res.send("Error " + err);
        }
    }

    async putEditPatientYear(req, res) {
        try {
            const patientId = req.params.id
            const newYear = req.body.year
            console.log(req.body)
            const client = await pool.connect();
            const result = await client.query(`UPDATE patients SET birthyear = '${newYear}' WHERE id = ${patientId};`);
            const results = {'results': (result) ? result.rows : null};
            res.send(results)
            client.release();
        } catch (err) {
            res.status(400)
            console.error(err);
            res.send("Error " + err);
        }
    }
}

export default new PatientController();