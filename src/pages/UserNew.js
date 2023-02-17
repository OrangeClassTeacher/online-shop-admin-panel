import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/esm/FormLabel";
import { url } from "./constant";

export const UserNew = ({ searchParams, setSearchParams, title, onSave }) => {
  const [show, setShow] = useState(searchParams && true);

  const init = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    id: "",
  };
  const [userItem, setUserItem] = useState(init);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState([]);

  const onClose = () => {
    setSearchParams({});
    setShow(false);
  };

  useEffect(() => {
    if (searchParams.get("p") == "edit" && searchParams.get("id")) {
      axios
        .get(`${url}/user/${searchParams.get("id")}`)
        .then((res) => {
          console.log(res.data);

          const { id, firstname, lastname, username, email } = res.data.result;
          setUserItem({
            ...userItem,
            id,
            firstname,
            lastname,
            username,
            // password,
            email,
          });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <FormLabel>Овог</FormLabel>
            <FormControl
              value={userItem.lastname}
              onChange={(e) => {
                setUserItem({ ...userItem, lastname: e.target.value });
              }}
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <FormLabel>Нэр</FormLabel>
            <FormControl
              value={userItem.firstname}
              onChange={(e) => {
                setUserItem({ ...userItem, firstname: e.target.value });
              }}
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <FormLabel>Хэрэглэгчийн нэр</FormLabel>
            <FormControl
              value={userItem.username}
              onChange={(e) => {
                setUserItem({ ...userItem, username: e.target.value });
              }}
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <FormLabel>Нууц үг</FormLabel>
            <FormControl
              value={userItem.password}
              onChange={(e) => {
                setUserItem({ ...userItem, password: e.target.value });

                const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])/g);
                const regex1 = new RegExp(/(?=.*[!@#$%^&*])(?=.*[0-9])/g);
                const regex2 = new RegExp(/(?=.{8,})/g);

                const para = e.target.value;

                console.log(regex.test(para));

                const newArr = [];
                newArr.push(
                  regex.test(para),
                  regex1.test(para),
                  regex2.test(para)
                );

                setIsValid(newArr);
              }}
              type="text"
            />
            <div>
              <ul>
                <li style={{ color: isValid[0] ? "green" : "grey" }}>
                  Том жижиг үсэг агуулсан байх
                </li>
                <li style={{ color: isValid[1] ? "green" : "grey" }}>
                  Тоо болон тэмдэгтийг агуулсан байх
                </li>
                <li style={{ color: isValid[2] ? "green" : "grey" }}>
                  8-аас дээш тэмдэгтийг агуулсан байх
                </li>
              </ul>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <FormLabel>Нууц үг давтах</FormLabel>
            <FormControl
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <FormLabel>И-мэйл</FormLabel>
            <FormControl
              value={userItem.email}
              onChange={(e) => {
                setUserItem({ ...userItem, email: e.target.value });
              }}
              type="email"
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
            onSave(userItem);
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
