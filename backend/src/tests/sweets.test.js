const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app");
const Sweet = require("../models/Sweet");
const User = require("../models/User");

describe("Sweets - Create", () => {
  test("admin should create a sweet", async () => {
    // create admin user directly in DB
    const admin = await User.create({
      email: "admin@sweet.com",
      password: "hashed",
      isAdmin: true,
    });

    const token = jwt.sign(
      { email: admin.email, isAdmin: true },
      "secret123"
    );

    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 10,
        quantity: 100,
      });

    expect(res.statusCode).toBe(201);

    const sweet = await Sweet.findOne({ name: "Ladoo" });
    expect(sweet).not.toBeNull();
  });


///

test("should get all sweets for authenticated user", async () => {
  // create normal user
  const user = await User.create({
    email: "user@sweet.com",
    password: "hashed",
    isAdmin: false,
  });

  const token = jwt.sign(
    { email: user.email, isAdmin: false },
    "secret123"
  );

  // seed sweets
  await Sweet.create({
    name: "Jalebi",
    category: "Indian",
    price: 15,
    quantity: 50,
  });

  const res = await request(app)
    .get("/api/sweets")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
});

// 

test("should search sweets by name", async () => {
  const user = await User.create({
    email: "search@sweet.com",
    password: "hashed",
    isAdmin: false,
  });

  const token = jwt.sign(
    { email: user.email, isAdmin: false },
    "secret123"
  );

  await Sweet.create([
    {
      name: "Gulab Jamun",
      category: "Indian",
      price: 20,
      quantity: 40,
    },
    {
      name: "Chocolate Cake",
      category: "Bakery",
      price: 200,
      quantity: 10,
    },
  ]);

  const res = await request(app)
    .get("/api/sweets/search?name=Gulab")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBe(1);
  expect(res.body[0].name).toBe("Gulab Jamun");
});

// updation
test("admin should update a sweet", async () => {
  // create admin
  const admin = await User.create({
    email: "updateadmin@sweet.com",
    password: "hashed",
    isAdmin: true,
  });

  const token = jwt.sign(
    { email: admin.email, isAdmin: true },
    "secret123"
  );

  // create sweet
  const sweet = await Sweet.create({
    name: "Barfi",
    category: "Indian",
    price: 30,
    quantity: 50,
  });

  const res = await request(app)
    .put(`/api/sweets/${sweet._id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      price: 40,
      quantity: 80,
    });

  expect(res.statusCode).toBe(200);
  expect(res.body.price).toBe(40);
  expect(res.body.quantity).toBe(80);
});


});

