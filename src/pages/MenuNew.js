import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/esm/FormLabel";
import axios from "axios";
const urlName = "http://localhost:9000/api/menu";

export const MenuNew = ({ searchParams, setSearchParams, title, onSave }) => {
  const [show, setShow] = useState(searchParams && true);

  const init = {
    menuName: "",
    link: "",
    iconName: "list",
  };
  const [menuItem, setMenuItem] = useState(init);

  const onClose = () => {
    setSearchParams({});
    setShow(false);
  };

  useEffect(() => {
    if (searchParams.get("p") == "edit" && searchParams.get("id")) {
      axios
        .get(`${urlName}/${searchParams.get("id")}`)
        .then((res) => {
          console.log(res.data);

          const { id, menuName, link, iconName } = res.data.result;
          setMenuItem({ ...menuItem, id, menuName, iconName, link });
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
            <FormLabel>Нэр</FormLabel>
            <FormControl
              value={menuItem.menuName}
              onChange={(e) => {
                setMenuItem({ ...menuItem, menuName: e.target.value });
              }}
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <FormLabel>Холбоос</FormLabel>
            <FormControl
              value={menuItem.link}
              onChange={(e) => {
                setMenuItem({ ...menuItem, link: e.target.value });
              }}
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <FormLabel>Icon Name</FormLabel>
            <FormControl
              value={menuItem.iconName}
              onChange={(e) => {
                setMenuItem({ ...menuItem, iconName: e.target.value });
              }}
              type="text"
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
            onSave(menuItem);
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
