import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";
import { getRestaurants, saveRestaurants } from "../utils/storage";

export default function AdminDashboard() {
  const [list, setList] = useState([]);

  const [form, setForm] = useState({
    name: "",
    address: "",
    type: "Rajasthani",
    parking: "true",
    image:
      "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg",
  });

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [parking, setParking] = useState("");

  useEffect(() => {
    setList(getRestaurants());
  }, []);

  const addRestaurant = () => {
    if (!form.name || !form.address) {
      alert("Fill all fields");
      return;
    }

    const newData = {
      restaurantID: Date.now(),
      restaurantName: form.name,
      address: form.address,
      type: form.type,
      parkingLot: form.parking === "true",
      image: form.image,
    };

    const updated = [...list, newData];

    saveRestaurants(updated);
    setList(updated);

    alert("Added Successfully");

    setForm({ ...form, name: "", address: "" });
  };

  const deleteData = (id) => {
    if (!window.confirm("Delete?")) return;

    const updated = list.filter((i) => i.restaurantID !== id);

    saveRestaurants(updated);
    setList(updated);

    alert("Deleted");
  };

  const filtered = list.filter((i) => {
    return (
      i.restaurantName.toLowerCase().includes(search.toLowerCase()) &&
      (type ? i.type === type : true) &&
      (parking ? String(i.parkingLot) === parking : true)
    );
  });

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        parking={parking}
        setParking={setParking}
      />

      <div className="admin">
        <div className="sidebar">
          <h3>Add Restaurant</h3>

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option>Rajasthani</option>
            <option>Gujarati</option>
            <option>Mughlai</option>
            <option>Jain</option>
            <option>Thai</option>
            <option>North Indian</option>
            <option>South Indian</option>
          </select>

          <select
            value={form.parking}
            onChange={(e) => setForm({ ...form, parking: e.target.value })}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <button onClick={addRestaurant}>Add</button>
        </div>

        <div className="grid">
          {filtered.map((r) => (
            <RestaurantCard
              key={r.restaurantID}
              data={r}
              isAdmin={true}
              onDelete={deleteData}
            />
          ))}
        </div>
      </div>
    </>
  );
}
