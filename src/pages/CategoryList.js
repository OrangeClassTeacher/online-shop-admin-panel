import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
// import FormLabel from "react-bootstrap/esm/FormLabel";
// import axios from "axios";

export const CategoryList = ({
  categories,
  onDeleteSelected,
  searchParams,
  setSearchParams,
  onDelete,
}) => {
  const [selected, setSelected] = useState([]);

  return (
    <div className="table-responsive">
      <div className="d-flex m-2">
        <Button
          variant="secondary"
          size="xs"
          onClick={() => onDeleteSelected(selected)}
        >
          Selected Delete {selected.length}
        </Button>
      </div>
      <table className="table table-striped table-hover">
        <thead className="p-2">
          <th></th>
          <th>№</th>
          <th>Цэсний нэр</th>
          <th>Үйлдлүүд</th>
        </thead>
        <tbody>
          {categories.map(({ id, categoryName }, index) => {
            return (
              <tr>
                <td>
                  <Form.Check
                    value={false}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelected([...selected, id]);
                      } else {
                        const deletedArr = selected.filter((e) => e !== id);
                        setSelected(deletedArr);
                      }
                    }}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{categoryName}</td>

                <td>
                  <Button
                    className="mx-2"
                    onClick={() => {
                      setSearchParams({ p: "edit", id });
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="secondary" onClick={() => onDelete(id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
