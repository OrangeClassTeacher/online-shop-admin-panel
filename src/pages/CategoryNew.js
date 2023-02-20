import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/esm/FormLabel";
import axios from "axios";
import { url } from "./constant";

export const CategoryNew = ({
  searchParams,
  setSearchParams,
  title,
  onSave,
}) => {
  const [show, setShow] = useState(searchParams && true);

  const init = {
    categoyName: "",
    id: "",
  };
  const [categoryItem, setCategoryItem] = useState(init);

  const onClose = () => {
    setSearchParams({});
    setShow(false);
  };

  useEffect(() => {
    if (searchParams.get("p") == "edit" && searchParams.get("id")) {
      axios
        .get(`${url}/category/${searchParams.get("id")}`)
        .then((res) => {
          console.log(res);
          const { id, categoryName } = res.data.result;
          setCategoryItem({ ...categoryItem, id, categoryName });
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
              value={categoryItem.categoryName}
              onChange={(e) => {
                setCategoryItem({
                  ...categoryItem,
                  categoryName: e.target.value,
                });
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
            onSave(categoryItem);
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
