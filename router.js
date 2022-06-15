import Router from 'express'
import PatientController from "./PatientController.js";

const router = new Router()

router.get('/', PatientController.home)
router.get('/patients', PatientController.getAllPatients)
router.get('/patients/:id', PatientController.getTargetPatient)
router.get('/researches', PatientController.getAllResearches,)
router.get('/patients/researches/:id', PatientController.getTargetResearchesPatient)
router.get('/*', PatientController.notFound)

router.post('/patients', PatientController.postNewPatient)
router.post('/patients/researches', PatientController.postNewResearches)

router.put('/patients/:id/changeName', PatientController.putEditPatientName)
router.put('/patients/:id/changeYear', PatientController.putEditPatientYear)
router.put('/patients/:id/changeSex', PatientController.putEditPatientSex)
router.put('/patients/:id/changeAddress', PatientController.putEditPatientAddress)
router.put('/patients/researches', PatientController.putEditResearches)
export default router
