import Router from 'express'
import PostController from "./PatientController.js";

const router = new Router()

router.get('/', PostController.home)
router.get('/patients', PostController.getAllPatients)
router.get('/patients/:id', PostController.getTargetPatient)
router.get('/patients/researches/:id', PostController.getTargetResearchesPatient)
router.get('/*', PostController.notFound)

export default router
