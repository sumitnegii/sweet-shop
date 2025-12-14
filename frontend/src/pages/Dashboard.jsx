import { useEffect, useState } from "react";
import { getSweets, purchaseSweet, searchSweets } from "../api/sweets.api";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);

  // search state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const fetchSweets = async () => {
    try {
      const res = await getSweets();
      setSweets(res.data);
    } catch {
      alert("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await searchSweets({
        name: name || undefined,
        category: category || undefined,
      });
      setSweets(res.data);
    } catch {
      alert("Search failed");
    }
  };

  const handlePurchase = async (id) => {
    try {
      await purchaseSweet(id);
      fetchSweets();
    } catch {
      alert("Purchase failed");
    }
  };

  if (loading) return <p>Loading sweets...</p>;

  return (
  <div style={{ padding: 20, maxWidth: 1000, margin: "0 auto" }}>
    <h1 style={{ marginBottom: 20 }}>Sweet Shop</h1>

    {/* SEARCH BAR */}
    <form
      onSubmit={handleSearch}
      style={{
        display: "flex",
        gap: 10,
        marginBottom: 30,
        flexWrap: "wrap",
      }}
    >
      <input
        placeholder="Search by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: 8 }}
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ padding: 8 }}
      />
      <button type="submit">Search</button>
      <button type="button" onClick={fetchSweets}>
        Reset
      </button>
    </form>

    {sweets.length === 0 && <p>No sweets found</p>}

    {/* SWEET CARDS */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 20,
      }}
    >
      {sweets.map((sweet) => (
        <div
          key={sweet._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 6,
            padding: 15,
          }}
        >
          <h3 style={{ marginBottom: 10 }}>{sweet.name}</h3>
          <p><b>Category:</b> {sweet.category}</p>
          <p><b>Price:</b> ₹{sweet.price}</p>
          <p><b>Stock:</b> {sweet.quantity}</p>

          <button
            onClick={() => handlePurchase(sweet._id)}
            disabled={sweet.quantity === 0}
            style={{
              marginTop: 10,
              padding: "6px 12px",
              cursor: sweet.quantity === 0 ? "not-allowed" : "pointer",
            }}
          >
            {sweet.quantity === 0 ? "Out of stock" : "Purchase"}
          </button>
        </div>
      ))}
    </div>
  </div>
);

}
