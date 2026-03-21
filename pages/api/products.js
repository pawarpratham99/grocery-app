import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'Products.json');

export default function handler(req, res) {
  const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // 👉 GET (for testing)
  if (req.method === 'GET') {
    return res.status(200).json(products);
  }

  // 👉 POST (add product)
  if (req.method === 'POST') {
    const newProduct = {
      id: Date.now(), // unique id
      ...req.body
    };

    products.push(newProduct);

    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

    return res.status(201).json(newProduct);
  }
}