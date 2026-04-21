import fs from 'fs';
import path from 'path';

function getProductsPath() {
  return path.join(process.cwd(), 'data', 'Products.json');
}

function getProducts() {
  const data = fs.readFileSync(getProductsPath(), 'utf8');
  return JSON.parse(data);
}

let productList = getProducts();
// In-memory store so POST/DELETE persist during session


export default function handler(req, res) {
  
  // GET all products
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      count: productList.length,
      data: productList,
    });
  }

  // POST - add new product
  if (req.method === 'POST') {
    const { name, category, price, originalPrice, unit, emoji, inStock, description, tags } = req.body;

    // Basic validation
    if (!name || !category || !price || !unit) {
      return res.status(400).json({
        success: false,
        message: 'name, category, price and unit are required',
      });
    }

    const newProduct = {
      id: productList.length + 1,
      name,
      category,
      price,
      originalPrice: originalPrice || price,
      unit,
      emoji: emoji || '🛒',
      inStock: inStock !== undefined ? inStock : true,
      rating: 0,
      reviews: 0,
      description: description || '',
      tags: tags || [],
    };

    productList.push(newProduct);
    
    // Save the updated list back to the file
    fs.writeFileSync(getProductsPath(), JSON.stringify(productList, null, 2));

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    });
  }

  // Method not allowed
  return res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`,
  });
}