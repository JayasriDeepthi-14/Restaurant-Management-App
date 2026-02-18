import { Link } from "react-router-dom";

export default function RestaurantCard({ data, isAdmin, onDelete }) {
  return (
    <div className="card">
      <img src={data.image} alt="" />

      <h3>{data.restaurantName}</h3>
      <p>{data.address}</p>
      <p>{data.type}</p>
      <p>{data.parkingLot ? "Parking Available" : "No Parking"}</p>

      {isAdmin && (
        <div>
          <Link to={`/admin/update/${data.restaurantID}`}>
            <button>Edit</button>
          </Link>

          <button onClick={() => onDelete(data.restaurantID)}>Delete</button>
        </div>
      )}
    </div>
  );
}
