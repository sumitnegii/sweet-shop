import { useEffect, useState } from "react";
import {
  getSweets,
  createSweet,
  updateSweet,
  deleteSweet,
} from "../api/sweets.api";

export default function AdminPanel() {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const fetchSweets = async () => {
    const res = await getSweets();
    setSweets(res.data);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await createSweet({
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    });
    setForm({ name: "", category: "", price: "", quantity: "" });
    fetchSweets();
  };

  const handleUpdate = async (sweet) => {
    const price = prompt("New price", sweet.price);
    const quantity = prompt("New quantity", sweet.quantity);

    if (price && quantity) {
      await updateSweet(sweet._id, {
        price: Number(price),
        quantity: Number(quantity),
      });
      fetchSweets();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this sweet?")) {
      await deleteSweet(id);
      fetchSweets();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>

      <h3>Add Sweet</h3>
      <form onSubmit={handleAdd}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <input
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />
        <button type="submit">Add Sweet</button>
      </form>

      <hr />

      <h3>Manage Sweets</h3>
      {sweets.map((s) => (
        <div key={s._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <b>{s.name}</b> | {s.category} | ₹{s.price} | Stock: {s.quantity}
          <br />
          <button onClick={() => handleUpdate(s)}>Update</button>
          <button onClick={() => handleDelete(s._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
