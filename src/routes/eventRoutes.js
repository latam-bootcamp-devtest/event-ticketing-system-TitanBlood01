import { Router } from "express";
import * as eventController from "../controllers/eventController.js"

const router = new Router()

router.post('/', eventController.createEvent);
router.get('/', eventController.getEvents);

export default router;