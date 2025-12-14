const mongoose = require("mongoose");
const Sweet = require("../src/models/Sweet");


const MONGO_URI = "mongodb://127.0.0.1:27017/sweetshop";

const sweets = [
    { name: "Milk Cake", category: "Indian", price: 180, quantity: 35 },
  { name: "Kalakand", category: "Indian", price: 160, quantity: 28 },
  { name: "Malpua", category: "Dessert", price: 90, quantity: 22 },
  { name: "Besan Ladoo", category: "Indian", price: 20, quantity: 65 },
  { name: "Coconut Barfi", category: "Indian Sweet", price: 140, quantity: 30 },
  { name: "Chocolate Barfi", category: "Fusion", price: 220, quantity: 18 },
  { name: "Imarti", category: "Indian", price: 30, quantity: 40 },
  { name: "Sandesh", category: "Bengali", price: 25, quantity: 45 },
  { name: "Balushahi", category: "Indian", price: 35, quantity: 50 },
  { name: "Rabri", category: "Dessert", price: 120, quantity: 20 },
  { name: "Khoya Roll", category: "Indian", price: 70, quantity: 33 },
  { name: "Dry Fruit Ladoo", category: "Dry Fruit", price: 450, quantity: 15 },
  { name: "Ghewar", category: "Rajasthani", price: 250, quantity: 18 },
  { name: "Chenna Poda", category: "Odisha", price: 110, quantity: 26 },
  { name: "Shrikhand", category: "Western Indian", price: 95, quantity: 34 }

];


async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    await Sweet.deleteMany();
    await Sweet.insertMany(sweets);
    console.log("Sweets seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
