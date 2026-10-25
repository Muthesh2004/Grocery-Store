const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const categories = ['Fruits', 'Vegetables', 'Dairy', 'Snacks', 'Beverages', 'Grains'];

const sampleProducts = [];

categories.forEach((category, index) => {
  for (let i = 1; i <= 8; i++) {
    sampleProducts.push({
      name: `${category} Product ${i}`,
      description: `This is ${category} item number ${i}`,
      price: (Math.random() * 50 + 1).toFixed(2),
      image: `https://via.placeholder.com/150?text=${category}+${i}`,
      category,
      stock: Math.floor(Math.random() * 100 + 1)
    });
  }
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
  console.log('Database seeded with products!');
  process.exit();
}).catch(err => console.error(err));
