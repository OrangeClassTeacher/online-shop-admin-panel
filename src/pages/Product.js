import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/esm/FormLabel";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { apiKey, folderName, cloudName, uploadPreset } from "./constant";

export default function Product() {
  const { id } = useParams();

  const init = {
    productName: "",
    categoryId: 0,
    price: 0,
    thumbImage: "",
    images: [],
    salePercent: 0,
    quantity: 0,
    desc: "",
  };

  const [productItem, setProductItem] = useState(init);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(id);
    if (id) {
      axios.get(`http://localhost:9000/api/product/${id}`).then((res) => {
        setProductItem(res.data.result);
        console.log(res);
      });
    }
  }, []);

  const onSave = (e) => {
    console.log(e.target);
    console.log(e.target.productName.value);

    e.preventDefault();
    axios.post("http://localhost:9000/api/product", productItem).then((res) => {
      if (res.data.status) {
        navigate("/products");
      } else {
        alert("Hadgalahad aldaa garsan bna");
      }
    });
  };

  const sendFile = async (fieldName, files) => {
    setLoading(true);
    console.log(files);

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const newArr = [];
    for (let i = 0; i < files[0].length; i++) {
      newArr.push(files[0][i]);
    }

    const promise = await Promise.all(
      newArr.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("folder", folderName);
        formData.append("upload_preset", uploadPreset);

        return axios.post(url, formData);
      })
    );

    console.log(promise);

    const arr = [];

    promise.map((res) => {
      arr.push(res.data.secure_url);
    });

    if (fieldName == "images") {
      setProductItem({
        ...productItem,
        images: arr,
      });
    } else {
      setProductItem({
        ...productItem,
        thumbImage: arr[0],
      });
    }

    setLoading(false);
  };

  console.log("rendering");

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <Form onSubmit={onSave}>
            <Form.Group>
              <Form.Label>Product name</Form.Label>
              {/* <input type="text" name="productName" /> */}
              <Form.Control
                name="productName"
                // value={productItem?.productName}
                // onChange={(e) =>
                //   setProductItem({
                //     ...productItem,
                //     productName: e.target.value,
                //   })
                // }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={productItem?.price}
                onChange={(e) =>
                  setProductItem({ ...productItem, price: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={productItem?.categoryId}
                onChange={(e) =>
                  setProductItem({ ...productItem, categoryId: e.target.value })
                }
              ></Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Thumb Image</Form.Label>
              <Form.Control
                name="Test"
                type="file"
                // value={productItem?.thumbImage}
                onChange={(e) => {
                  console.log(e);
                  console.log(e.target.files);

                  const arr = [];

                  arr.push(e.target.files);

                  sendFile("thumbImage", arr);
                }}
              />
              <input type="file" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Slide images</Form.Label>
              <Form.Control
                multiple
                type="file"
                value={productItem?.images}
                onChange={(e) => {
                  console.log(e.target.files);

                  const arr = [];

                  arr.push(e.target.files);
                  // sendFile("thumbImage", arr);
                }}
                // onChange={(e) =>
                //   setProductItem({ ...productItem, price: e.target.value })
                // }
              />
            </Form.Group>
            <Button type="submit">Save</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
