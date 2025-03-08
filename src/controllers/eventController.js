import Event from "../models/eventModel.js";

export const createEvent = async (req, res) => {
    try {
        const {
            nameEvent,
            dateEvent,
            availableSeats
        } = req.body
        //const dateEvent = new Date (req.body.dateOfEvent);

        const newEvent = new Event({
            nameEvent,
            dateEvent,
            availableSeats
        })

        const eventSaved = await newEvent.save()

        res.status(201).json(eventSaved)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({message: "El evento ya esta creado previamente"})
        } else {
            console.error("Error al crear el evento", error.message);
            return res.status(500).json({message: "Error al crear el evento"})
        }
    }
}

export const getEvents = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1
        const limit = parseInt(req.query.limit, 10) || 10;

        const events = await Event.find()
        res.status(200).json(events)
    } catch (error) {
        console.error("error al obtener los eventos", error.message)
        return res.status(500).json({message: "Error al obtener los eventos"})
    }
}