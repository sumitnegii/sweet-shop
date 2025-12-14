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
});
