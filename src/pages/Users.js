import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSearchParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/esm/FormLabel";
import axios from "axios";
import { url } from "./constant";
import { UserList } from "./UserList";
import { UserNew } from "./UserNew";

export default function Users() {
  const title = "Хэрэглэгч";
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    axios
      .get(url + "/user")
      .then(({ data: { status, result } }) => {
        console.log(status, result);
        if (status) setUsers(result);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const onSave = (userItem) => {
    if (userItem.id) {
      axios
        .post(url + "/user", userItem)
        .then((res) => {
          if (res.data.status) {
            // alert(res.data.message);
            getUsers();
          } else {
            // setShow(false);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => console.log("finally"));
    } else {
      axios
        .post(url + "/user", userItem)
        .then((res) => {
          if (res.data.status) {
            // alert(res.data.message);
            getUsers();
          } else {
            // setShow(false);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => console.log("finally"));
    }
  };
  const onDelete = (id) => {
    const mes = window.confirm("Та устгахдаа итгэлтэй байна уу");
    if (mes) {
      setLoading(true);
      axios
        .delete(`${url}/user/${id}`)
        .then((res) => {
          if (res.data.status) {
            getUsers();
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
      <div className="col-md-12 col-xs-8 ">
        <div className="d-flex justify-content-between aligns-item-center">
          <h2>{title}</h2>
          <Button
            variant="primary"
            onClick={() => setSearchParams({ p: "new" })}
          >
            Хэрэглэгч нэмэх
          </Button>
        </div>
        <UserList
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          users={users}
          onDelete={onDelete}
        />
        {(searchParams.get("p") == "new" ||
          searchParams.get("p") == "edit") && (
          <UserNew
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
