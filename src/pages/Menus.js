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
const urlName = "http://localhost:9000/api/menu";

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
      .get(urlName)
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
        .put(`${urlName}/${menuItem.id}`, menuItem)
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
        .post(urlName, menuItem)
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
      axios
        .post(`${urlName}/delete-batches-menu`, {
          deleteMenuIds: selected,
        })
        .then((res) => {
          getMenus();
          console.log(res.data.message);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="row mx-auto">
      <div className="col-md-12">
        <div className="d-flex justify-content-between aligns-item-center">
          <h2>{title}</h2>
          <Button
            variant="primary"
            onClick={() => setSearchParams({ p: "new" })}
          >
            New
          </Button>
        </div>
        <MenuList
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          menus={menus}
          onDeleteSelected={onDeleteSelected}
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
