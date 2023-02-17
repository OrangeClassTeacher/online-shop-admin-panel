import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { url } from "./constant";

export default function ProductList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url + "/product")
      .then((res) => {
        setData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (loading) return <Loading />;

  return (
    <div className="container p-4">
      <h2>Product list</h2>
      <button
        onClick={() => navigate("/admin/product")}
        className="btn btn-warning"
      >
        Add Product
      </button>
      <div className="table-responsive">
        <table className="table">
          <tbody>
            {data.map(({ price, productName, id, categoryId }, index) => (
              <tr key={index}>
                <td>{productName}</td>
                <td>{price}</td>
                <td>{categoryId}</td>
                <td>
                  <a href={`/admin/product/${id}`}>
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
