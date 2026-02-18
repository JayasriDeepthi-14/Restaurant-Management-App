import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar({ search, setSearch, type, setType, parking, setParking }) {
  const { logout } = useContext(AuthContext);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="navbar">
      <input
        ref={inputRef}
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">All</option>
        <option>Rajasthani</option>
        <option>Gujarati</option>
        <option>Mughlai</option>
        <option>Jain</option>
        <option>Thai</option>
        <option>North Indian</option>
        <option>South Indian</option>
      </select>

      <select value={parking} onChange={(e) => setParking(e.target.value)}>
        <option value="">All</option>
        <option value="true">Parking</option>
        <option value="false">No Parking</option>
      </select>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
