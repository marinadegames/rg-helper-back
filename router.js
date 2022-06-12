import Router from 'express'
import PatientController from "./PatientController.js";

const router = new Router()

router.get('/', PatientController.home)
router.get('/patients', PatientController.getAllPatients)
router.get('/patients/:id', PatientController.getTargetPatient)
router.get('/patients/researches/:id', PatientController.getTargetResearchesPatient)
router.get('/*', PatientController.notFound)

router.post('/patients', PatientController.postNewPatient)

export default router
