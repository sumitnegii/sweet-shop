import { useEffect, useState } from "react";
import { getSweets, purchaseSweet } from "../api/sweets.api";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSweets = async () => {
    try {
      const res = await getSweets();
      setSweets(res.data);
    } catch (err) {
      alert("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handlePurchase = async (id) => {
    try {
      await purchaseSweet(id);
      fetchSweets(); // refresh list
    } catch (err) {
      alert("Purchase failed");
    }
  };

  if (loading) return <p>Loading sweets...</p>;

  return (
    <div>
      <h1>Sweet-Shop (Agrwal)</h1>

      {sweets.map((sweet) => (
        <div key={sweet._id} style={{ border: "1px solid #ccc", padding: 10 }}>
          <h3>{sweet.name}</h3>
          <p>Category: {sweet.category}</p>
          <p>Price: ₹{sweet.price}</p>
          <p>Stock: {sweet.quantity}</p>

          <button
            onClick={() => handlePurchase(sweet._id)}
            disabled={sweet.quantity === 0}
          >
            {sweet.quantity === 0 ? "Out of stock" : "Purchase"}
          </button>
        </div>
      ))}
    </div>
  );
}
