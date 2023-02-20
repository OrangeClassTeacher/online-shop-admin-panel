import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSearchParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/esm/FormLabel";
import axios from "axios";
import { CategoryNew } from "./CategoryNew";
import { CategoryList } from "./CategoryList";
import { url } from "./constant";

export default function Categories() {
  const title = "Ангилал";
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    setLoading(true);
    axios
      .get(url + "/category")
      .then(({ data: { status, result } }) => {
        console.log(status, result);
        if (status) setCategories(result);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const onSave = (categoryItem) => {
    console.log(categoryItem);
    if (categoryItem.id) {
      setLoading(true);
      axios
        .put(`${url}/category"/${categoryItem.id}`, categoryItem)
        .then((res) => {
          if (res.data.status) {
            // alert(res.data.message);
            getCategories();
          } else {
            // setShow(false);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(true);
      axios
        .post(url + "/category", categoryItem)
        .then((res) => {
          console.log(res);
          if (res.data.status) {
            // alert(res.data.message);
            getCategories();
          } else {
            // setShow(false);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };

  const onDeleteSelected = (selected) => {
    const mes = window.confirm("Та устгахдаа итгэлтэй байна уу");
    if (mes) {
      setLoading(true);
      axios
        .post(`${url + "/category"}/delete-batches-menu`, {
          deleteMenuIds: selected,
        })
        .then((res) => {
          if (res.data.status) {
            getCategories();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };
  const onDelete = (id) => {
    const mes = window.confirm("Та устгахдаа итгэлтэй байна уу");
    if (mes) {
      setLoading(true);
      axios
        .delete(`${url}/category/${id}`)
        .then((res) => {
          if (res.data.status) {
            getCategories();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="row p-4">
      <div className="col-md-12">
        <div className="d-flex justify-content-between aligns-item-center">
          <h2>{title}</h2>
          <Button
            variant="primary"
            onClick={() => setSearchParams({ p: "new" })}
          >
            Ангилал нэмэх
          </Button>
        </div>
        <CategoryList
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          categories={categories}
          onDeleteSelected={onDeleteSelected}
          onDelete={onDelete}
        />
        {(searchParams.get("p") == "new" ||
          searchParams.get("p") == "edit") && (
          <CategoryNew
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
