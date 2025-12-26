import { config } from 'dotenv';
config({ quiet: true })

export default {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL
}