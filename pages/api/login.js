import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt';


const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res){
    if(req.method === 'POST'){
        const {email, password} = req.body;
        try {
            await client.connect();
            const db = client.db('auth-app');
            const userCollection = db.collection('users')
            const user = await userCollection.findOne({email});
            if(!user){
                return res.status(404).json({success:false, message:'User not found'})
            }
            const isPasswordValid = await (password, user.password);
            if(!isPasswordValid){
                return res.status(401).json({success:false, message:"Incorrect Password"});

            }
            return res.status(200).json({success:true, message: "Login successfully"})
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ success: false, message: 'Server error.' });
        }finally {
            // Close the connection
            await client.close();
        }
    }
    else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ success: false, message: `Method ${req.method} not allowed.` });
    }

}