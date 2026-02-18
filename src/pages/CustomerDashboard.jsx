import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";
import { getRestaurants } from "../utils/storage";

export default function CustomerDashboard() {
  const [list, setList] = useState([]);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [parking, setParking] = useState("");

  useEffect(() => {
    setList(getRestaurants());
  }, []);

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

      <div className="grid">
        {filtered.map((r) => (
          <RestaurantCard key={r.restaurantID} data={r} />
        ))}
      </div>
    </>
  );
}
