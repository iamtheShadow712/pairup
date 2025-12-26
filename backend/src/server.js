import express from 'express';
import ENV from "./lib/env.config.js"
import { connectDB } from './lib/db.js';

const PORT = ENV.PORT || 3000
const app = express()

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

