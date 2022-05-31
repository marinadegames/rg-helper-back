import {addUser, deleteUser, getUsers, updateUser} from "./repository.js";
import express from "express";

const router = express.Router()

router.get('/', async (req, res) => {
    let users = await getUsers()
    console.log(users)

    if (!!req.query.search) {
        users = users.filter(u => u.name.indexOf(req.query.search) > -1)
    }
    res.send(users)
})
router.get('/:id', async (req, res) => {
    const userId = req.params.id
    let users = await getUsers()
    let user = users.find(u => u.id == userId)
    console.log(user)
    if (user) {
        res.send(user)
    } else {
        res.sendStatus(404)
    }
})
router.delete('/:id', async (req, res) => {
    const userId = req.params.id
    await deleteUser(userId)
    res.send(204)
})
router.post('/', async (req, res) => {
    let name = req.body.name
    await addUser(name)
    res.send({"success": true})
})
router.put('/', async (req, res) => {
    let name = req.body.name
    let id = req.body.id
    await updateUser(id, name)
    res.send({"success": true})
})
export default router