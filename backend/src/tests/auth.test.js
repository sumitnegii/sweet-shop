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

  test("user should be saved in database on register", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        email: "db@example.com",
        password: "password123",
      });

    const user = await User.findOne({ email: "db@example.com" });

    expect(user).not.toBeNull();
  });

});
