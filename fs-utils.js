import fs from "fs";
import chalk from "chalk";

export const readJSONFromFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, function (err, buf) {
            if (err) {
                reject(err)
            } else {
                resolve(JSON.parse(buf.toString()))
            }
        })
    })
}

export const writeJSONToFile = (filePath, data) => {
    return new Promise((res, rej) => {
        fs.writeFile('db', JSON.stringify(data), (err) => {
            if (err) {
                rej(err)
                console.log(chalk.red(err))
            }
            console.log(chalk.greenBright('ADD USER SUCCESSFUL! '))
            res()
        })
    })
}

