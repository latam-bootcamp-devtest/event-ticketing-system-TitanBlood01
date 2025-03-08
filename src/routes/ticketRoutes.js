import { Router } from "express";
import * as ticketController from "../controllers/ticketControlle.js"

const router = new Router()

router.post('/', ticketController.createTicket);
router.get('/', ticketController.getTickets);
router.delete('/:ticketId', ticketController.deleteTicketbyId);

export default router;