import User from "../models/userModel.js";

export const createUser = async (req, res) => {
    const {name, email} = req.body

    try {
        const newUser = new User({
            name, email
        })

        const userSaved = await newUser.save()

        res.status(201).json(userSaved)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({message: "El usuario ya esta creado previamente"})
        } else {
            console.error("Error al crear el usuario", error.message);
            return res.status(500).json({message: "Error al crear el usuario"})
        }
    }
}

export const getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1
        const limit = parseInt(req.query.limit, 10) || 10;
        
        const users = await User.find().sort({})
        res.status(200).json(users)
    } catch (error) {
        console.error("error al obtener los usuarios", error.message)
        return res.status(500).json({message: "Error al obtener los usuarios"})
    }
}