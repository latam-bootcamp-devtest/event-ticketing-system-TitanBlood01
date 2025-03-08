import User from "../models/userModel.js";
import Event from "../models/eventModel.js";
import Ticket from "../models/ticketModel.js";

export const createTicket = async (req, res) => {
    const {userId, eventId} = req.body

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({message: "No se encontro un usuario con ese id"})
        }
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(400).json({message: "No se encontro un evento con ese id"})
        }
        
        if (event.availableSeats == 0){
            return res.status(400).json({message: "No hay mas asientos disponibles"})
        } else {
            const newavailableSeats = event.availableSeats - 1;
            event.availableSeats = newavailableSeats;
            event.save()
        }

        const newTicket = new Ticket({
            userId,
            eventId,
        })
        const ticketSaved = await newTicket.save()

        res.status(201).json(ticketSaved)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({message: "El ticket ya esta creado previamente"})
        } else {
            console.error("Error al crear el ticket", error.message);
            return res.status(500).json({message: "Error al crear el ticket"})
        }
    }
}

export const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find()
        res.status(200).json(tickets)
    } catch (error) {
        console.error("error al obtener los Tickets", error.message)
        return res.status(500).json({message: "Error al obtener los tickets"})
    }
}

export const deleteTicketbyId = async (req, res) => {
    try {
        const {ticketId} = req.params;

        const detectedTicket = await Ticket.findById(ticketId)
        const eventfounded = await Event.findById(detectedTicket.eventId);
        const recoverySeat = eventfounded.availableSeats + 1;
        eventfounded.availableSeats = recoverySeat;
        eventfounded.save();

        const deletedTicket = await Ticket.findByIdAndDelete(ticketId)
        if(!deletedTicket){
            res.status(404).json({message: "ticket no encontrado"})
        } else {
            res.status(200).json({message: "Ticket Eliminado con exito, se aumento el numero de asientos"})
        }
    } catch (error) {
        console.error("error al eliminar el Ticket", error.message)
        return res.status(500).json({message: "Error al intentar eliminar el ticket"})
    }
}