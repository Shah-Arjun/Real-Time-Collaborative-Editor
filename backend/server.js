import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const httpServer = createServer(app)


const io = new Server(httpServer, {
    cors: {
        origin: "*",                               // Allow all origins for development purposes
        method: ["GET", "POST", "PUT", "DELETE"],
    }
})


app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "Hello From backend server" })
})

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Ok"
    })
})


const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
    console.log("Server is running on port ", PORT)
})