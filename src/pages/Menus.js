import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSearchParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/esm/FormLabel";
import axios from "axios";
import { MenuNew } from "./MenuNew";
import { MenuList } from "./MenuList";
import { url } from "./constant";

export default function Menus() {
  const title = "Цэс";
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [menus, setMenus] = useState([]);
  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = () => {
    setLoading(true);
    axios
      .get(url + "/menu")
      .then(({ data: { status, result } }) => {
        console.log(status, result);
        if (status) setMenus(result);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const onSave = (menuItem) => {
    if (menuItem.id) {
      axios
        .put(`${url + "/menu"}/${menuItem.id}`, menuItem)
        .then((res) => {
          if (res.data.status) {
            // alert(res.data.message);
            getMenus();
          } else {
            // setShow(false);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => console.log("finally"));
    } else {
      axios
        .post(url + "/menu", menuItem)
        .then((res) => {
          if (res.data.status) {
            // alert(res.data.message);
            getMenus();
          } else {
            // setShow(false);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => console.log("finally"));
    }
  };

  const onDeleteSelected = (selected) => {
    const mes = window.confirm("Та устгахдаа итгэлтэй байна уу");
    if (mes) {
      setLoading(true);
      axios
        .post(`${url + "/menu"}/delete-batches-menu`, {
          deleteMenuIds: selected,
        })
        .then((res) => {
          if (res.data.status) {
            getMenus();
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
        .delete(`${url}/menu/${id}`)
        .then((res) => {
          if (res.data.status) {
            getMenus();
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
            Цэс нэмэх
          </Button>
        </div>
        <MenuList
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          menus={menus}
          onDeleteSelected={onDeleteSelected}
          onDelete={onDelete}
        />
        {(searchParams.get("p") == "new" ||
          searchParams.get("p") == "edit") && (
          <MenuNew
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
