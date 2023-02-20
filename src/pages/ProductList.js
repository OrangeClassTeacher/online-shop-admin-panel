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
    <div className="row p-4">
      <div className="col-md-12">
        <div className="d-flex justify-content-between aligns-item-center">
          <h2>Product list</h2>
          <button
            onClick={() => navigate("/admin/product")}
            className="btn btn-warning"
          >
            Add Product
          </button>
        </div>

        <div className="table-responsive mt-4">
          <table className="table">
            <thead>
              <th>№</th>
              <th>Ангилал</th>
              <th>Зураг</th>
              <th>Нэр</th>
              <th>Үнэ</th>
              <th>Тоо ширхэг</th>
              <th>Брендийн нэр</th>
              <th>Хямдрах хувь</th>
              <th>Хямдрал дуусах огноо</th>
              <th>Үйлдлүүд</th>
            </thead>
            <tbody>
              {data.map(
                (
                  {
                    id,
                    price,
                    productName,
                    quantity,
                    brandId,
                    salePercent,
                    saleFinishDate,
                    categoryId,
                    thumbImage,
                  },
                  index
                ) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{categoryId}</td>
                    <td>
                      <img width={50} src={thumbImage} alt="" />
                    </td>
                    <td>{productName}</td>
                    <td>{price}</td>
                    <td>{quantity}</td>
                    <td>{brandId}</td>
                    <td>{salePercent}</td>
                    <td>{saleFinishDate}</td>
                    <td>
                      <a href={`/admin/product/${id}`} className="mx-2">
                        <span className="btn btn-warning">Edit</span>
                      </a>
                      <span className="btn btn-danger">Delete</span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
