import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();


const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.on('open', () => {
// 	console.log('Connected to Database')
// })

// const db = client.connect().then(() => {
//     console.log('Connected to MongoDB');
//     return client.db('unshelled_db');

// }).catch((error) => console.log('Failed to connect to MongoDB:', error))


const db = client.db('unshelled_db')
export default db;

