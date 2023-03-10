import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGODB_URI

export const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Create a new MongoClient
export const run = async () => {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect()
            .then(() => console.log('Connected successfully to server'))

        // Establish and verify connection
        const db = await client.db('unshelled_db')
        return db
    } catch (err) {
        client.close()
        throw new Error(err)
    }
}
