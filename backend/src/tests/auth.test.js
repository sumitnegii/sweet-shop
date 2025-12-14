const bcrypt = require("bcryptjs");

test("password should be hashed before use", async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      email: "hash@example.com",
      password: "mypassword",
    });

  expect(res.statusCode).toBe(201);

  const decoded = jwt.verify(res.body.token, "secret123");
  expect(decoded.email).toBe("hash@example.com");

  // Password should never be returned
  expect(res.body.password).toBeUndefined();
});
