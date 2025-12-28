import express from 'express';
import ENV from "./lib/env.config.js";
import { connectDB } from './lib/db.js';
import cors from 'cors';
import { serve } from "inngest/express"
import { functions, inngest } from './lib/inngest.js';

const PORT = ENV.PORT || 3000;
const app = express()

// middleware
app.use(express.json())
app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true
}))

app.use("/api/inngest", serve({ client: inngest, functions }))

app.get('/live', (req, res) => {
    res.status(200).json({
        status: "OK"
    })
})

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`)
        })
    } catch (error) {
        console.log('Error starting server ❌', error)
    }
}

startServer()

export default app

