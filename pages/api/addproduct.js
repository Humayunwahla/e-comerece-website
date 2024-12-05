import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { products } = req.body;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ success: false, message: 'Invalid product data.' });
    }

    try {
      await client.connect();
      const db = client.db("auth-app");
      const productCollection = db.collection("products");

      // Insert the products into the database
      await productCollection.insertMany(products);

      return res.status(200).json({ success: true, message: 'Products added successfully.' });
    } catch (error) {
      console.error('Error adding products:', error);
      return res.status(500).json({ success: false, message: 'Server error.' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} not allowed.` });
  }
}
