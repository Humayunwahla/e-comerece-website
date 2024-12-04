
import { MongoClient } from "mongodb";


export default async function handler(req, res) {

  
    if (req.method === 'POST') {
        const { name, phone, email, password } = req.body;
        if (!name || !phone || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        try {
            const client = await MongoClient.connect(process.env.MONGODB_URI);
            const db = client.db("auth-app");
            const collection = db.collection("users")

            const existingUser = await collection.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already Exist. " })
            }
            await collection.insertOne({ name, phone, email, password });
            client.close();
            res.status(201).json({ message: 'User register successfully.' });
            
        } catch (error) {
            res.status(500).json({ message: "Internal server error" })
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Methode ${req.method} not allowed.   ` })
    }
}

