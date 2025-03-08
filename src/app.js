import express from "express";
import cors from "cors";
import morgan from "morgan";
import evenRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

const app = express()

app.use(cors());

app.use (morgan('dev'));
app.use(express.json())

app.use('/api/events', evenRoutes)
app.use('/api/users', userRoutes)
app.use('/api/tickets', ticketRoutes)

export default app;