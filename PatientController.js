import {pool} from "./index.js";

class PatientController {
    async home(req, res) {
        res.write(`<h1>WELCOME!</h1>`)
        res.end()
    }

    async getAllPatients(req, res) {
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
            console.error(err);
            res.send("Error " + err);
        }
    }

    async notFound(req, res) {
        res.send(`<h1>404 not found</h1>`)
        res.end()
    }

    async postNewPatient(req, res) {
        try {
            const newPatient = req.body
            const client = await pool.connect();
            console.log(newPatient)
            const result = await client.query(
                `
                INSERT INTO patients (name, birthyear, sex, address, dateres)
                VALUES ("${newPatient.name}", "${newPatient.year}", "${newPatient.sex}", "${newPatient.address}", CURRENT_TIMESTAMP);
                `
            );
            const results = {'results': (result) ? result.rows : null};
            res.send(results)
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    }
}

export default new PatientController();