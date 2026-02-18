import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRestaurants, saveRestaurants } from "../utils/storage";

export default function UpdateRestaurant() {
  const { id } = useParams();
  const nav = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    const list = getRestaurants();
    setData(list.find((i) => i.restaurantID == id));
  }, [id]);

  const update = () => {
    if (!window.confirm("Update?")) return;

    const list = getRestaurants();

    const updated = list.map((i) =>
      i.restaurantID == id ? data : i
    );

    saveRestaurants(updated);

    alert("Updated");

    nav("/admin/dashboard");
  };

  if (!data) return null;

  return (
    <div className="update">
      <h2>Update</h2>

      <input
        value={data.restaurantName}
        onChange={(e) =>
          setData({ ...data, restaurantName: e.target.value })
        }
      />

      <input
        value={data.address}
        onChange={(e) =>
          setData({ ...data, address: e.target.value })
        }
      />

      <button onClick={update}>Update</button>
    </div>
  );
}
