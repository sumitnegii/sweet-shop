const mongoose = require("mongoose");
const app = require("./src/app");

const PORT = 5000;

mongoose
  .connect("mongodb://127.0.0.1:27017/sweetshop")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, "127.0.0.1", () => {
      console.log(`Server running on http://127.0.0.1:${PORT}`);
    });
  })
  .catch((err) => console.error(err));
