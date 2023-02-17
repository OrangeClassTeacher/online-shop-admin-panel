import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/product")
      .then((res) => setData(res.data.result));
  }, []);
  return (
    <div className="container p-4">
      <h2>Product list</h2>
      <button onClick={() => navigate("/product")}>add Product</button>
      <div className="table-responsive">
        <table className="table">
          <tbody>
            {data.map(({ price, productName, id, categoryId }, index) => (
              <tr key={index}>
                <td>{productName}</td>
                <td>{price}</td>
                <td>{categoryId}</td>
                <td>
                  <a href={`/product/${id}`}>
                    <span className="btn btn-warning">Edit</span>
                  </a>
                  <span className="btn btn-danger">Delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
