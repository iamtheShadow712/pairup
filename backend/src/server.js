import express from 'express';
import ENV from "./lib/env.config.js"

const PORT = ENV.PORT || 3000

const app = express()

app.get('/live', (req, res) => {
    res.status(200).json({
        status: "OK"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

export default app