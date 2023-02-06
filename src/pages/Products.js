import React, { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSearchParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/esm/FormLabel";
import axios from "axios";
import { apiKey, folderName, cloudName, uploadPreset } from "./constant";

export default function Products() {
  const title = "Бүтээгдэхүүн";
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/product")
      .then(({ data: { status, result } }) => {
        console.log(status, result);
        if (status) setProducts(result);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const onSave = (productItem) => {
    console.log(productItem);
    axios
      .post("http://localhost:8000/api/product", productItem)
      .then((res) => {
        if (res.data.status) {
          // alert(res.data.message);
          getProducts();
        } else {
          // setShow(false);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => console.log("finally"));
  };

  return (
    <div className="row mx-auto">
      <div className="col-md-6">
        <div className="d-flex justify-content-between aligns-item-center">
          <h2>{title}</h2>
          <Button
            variant="primary"
            onClick={() => setSearchParams({ p: "new" })}
          >
            New
          </Button>
        </div>
        <ProductList
          loading={loading}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          products={products}
        />
        {searchParams.get("p") == "new" && (
          <ProductNew
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            title={title}
            onSave={onSave}
          />
        )}
      </div>
    </div>
  );
}

const ProductList = ({ loading, products, searchParams, setSearchParams }) => {
  const [selected, setSelected] = useState([]);

  return (
    <div className="table-responsive mt-3">
      <table className="table">
        <thead>
          <th></th>
          <th>№</th>
          <th>Цэсний нэр</th>
          <th>Icon</th>
        </thead>
        <tbody>
          {loading
            ? "loading ..."
            : products.map(({ id, productName, categoryId, price }, index) => (
                <tr>
                  <td>
                    <Form.Check
                      value={false}
                      onChange={() => {
                        setSelected([...selected, id]);
                      }}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{productName}</td>
                  <td>{categoryId}</td>
                  <td>
                    <Button
                      className="mx-2"
                      onClick={() => {
                        setSearchParams({ p: "new" });
                      }}
                    >
                      Edit
                    </Button>
                    <Button variant="secondary">Delete</Button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

const ProductNew = ({ searchParams, setSearchParams, title, onSave }) => {
  const [show, setShow] = useState(searchParams && true);
  const [loading, setLoading] = useState(false);

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

  const onClose = () => {
    setSearchParams({});
    setShow(false);
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

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <FormLabel>Бүтээгдэхүүний нэр</FormLabel>
            <FormControl
              value={productItem.productName}
              onChange={(e) => {
                setProductItem({
                  ...productItem,
                  productName: e.target.value,
                });
              }}
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <FormLabel>Үнэ</FormLabel>
            <FormControl
              value={productItem.price}
              onChange={(e) => {
                setProductItem({ ...productItem, price: e.target.value });
              }}
              type="text"
            />
          </Form.Group>
          {loading && "loading ..."}
          <Form.Group className="mb-3">
            <FormLabel>Зураг</FormLabel>
            <FormControl
              onChange={(e) => {
                console.log(e.target.files);

                const arr = [];

                arr.push(e.target.files);
                sendFile("thumbImage", arr);
              }}
              type="file"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <FormLabel>Slide images</FormLabel>
            <FormControl
              onChange={(e) => {
                console.log(e.target.files);

                const arr = [];
                arr.push(e.target.files);
                sendFile("images", arr);
              }}
              type="file"
              multiple
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onClose();
            onSave(productItem);
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
