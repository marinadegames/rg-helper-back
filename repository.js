import {readJSONFromFile} from "./fs-utils.js";
import mongoose from "mongoose";

let patientsSchema = new mongoose.Schema({
    // numRes: Number,
    name: String,
    // sex: String,
    // address: String,

})
export let Patient = mongoose.model('Patients', patientsSchema)

export const getUsers = (search) => {
    if (!search) {
        return Patient.find()
    } else {
        return Patient.find({name: new RegExp(search)})
    }
}

export const getUser = (id) => {
    return Patient.find({_id: id})
}

export const updateUser = (id, name) => {
    return Patient.update({_id: id}, {name: name})
}

export const addUser = async (name) => {
    console.log('POST NAME: ', name)
    let Patient_ONE = new Patient({
        name: name
    })
    return Patient_ONE.save()
}

export const deleteUser = async (id) => {
    console.log('DELETE PATIENT:', id)
    return Patient.deleteOne({_id: id})

}