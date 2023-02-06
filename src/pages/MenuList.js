import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/esm/FormLabel";
import axios from "axios";
const urlName = "http://localhost:8000/api/menu";

export const MenuList = ({
  menus,
  onDeleteSelected,
  searchParams,
  setSearchParams,
}) => {
  const [selected, setSelected] = useState([]);

  return (
    <div className="table-responsive mt-3">
      <div className="d-flex">
        <div>Сонгогдсон: {selected.length}</div>
        <Button
          variant="secondary"
          size="xs"
          onClick={() => onDeleteSelected(selected)}
        >
          Selected Delete
        </Button>
      </div>
      <table className="table">
        <thead>
          <th></th>
          <th>№</th>
          <th>Цэсний нэр</th>
          <th>Icon</th>
        </thead>
        <tbody>
          {menus.map(({ id, menuName, iconName, createdDate }, index) => {
            const date = new Date(createdDate);

            console.log(date.toLocaleDateString());
            return (
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
                <td>{menuName}</td>
                <td>{iconName}</td>

                <td>{date && date.toLocaleDateString()}</td>
                <td>
                  <Button
                    className="mx-2"
                    onClick={() => {
                      setSearchParams({ p: "edit", id });
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="secondary">Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
