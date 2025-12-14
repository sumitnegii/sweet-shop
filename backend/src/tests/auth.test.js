const request = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = require("../app");
const User = require("../models/User");

describe("Auth - Register", () => {

  test("password should not be returned and token should be valid", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "hash@example.com",
        password: "mypassword",
      });

    expect(res.statusCode).toBe(201);

    const decoded = jwt.verify(res.body.token, "secret123");
    expect(decoded.email).toBe("hash@example.com");

    // password should never be returned
    expect(res.body.password).toBeUndefined();
  });

  test("should not allow duplicate email registration", async () => {
  // first registration
  await request(app)
    .post("/api/auth/register")
    .send({
      email: "dup@example.com",
      password: "password123",
    });

  // duplicate registration
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      email: "dup@example.com",
      password: "password123",
    });

  expect(res.statusCode).toBe(409);

  const users = await User.find({ email: "dup@example.com" });
  expect(users.length).toBe(1);
});
// new test here
test("should login existing user and return JWT", async () => {
  // First register user
  await request(app)
    .post("/api/auth/register")
    .send({
      email: "login@example.com",
      password: "password123",
    });

  // Then login
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "login@example.com",
      password: "password123",
    });

  expect(res.statusCode).toBe(200);
  expect(res.body.token).toBeDefined();

  const decoded = jwt.verify(res.body.token, "secret123");
  expect(decoded.email).toBe("login@example.com");
});


});
