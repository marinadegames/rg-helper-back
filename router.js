import Router from 'express'
import PatientController from "./PatientController.js";

const router = new Router()

router.get('/', PatientController.home)
router.get('/patients', PatientController.getAllPatients)
router.get('/patients/:id', PatientController.getTargetPatient)
router.get('/patients/researches/:id', PatientController.getTargetResearchesPatient)
router.get('/*', PatientController.notFound)

router.post('/patients', PatientController.postNewPatient)
router.post('/patients/researches', PatientController.postNewResearches)

router.put('/patients/:id/changeName', PatientController.putEditPatientName)
router.put('/patients/:id/changeYear', PatientController.putEditPatientYear)
export default router
