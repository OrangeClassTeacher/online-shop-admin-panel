import React, { useState } from "react";
import Button from "react-bootstrap/Button";

export const UserList = ({
  users,
  onDelete,
  searchParams,
  setSearchParams,
}) => {
  return (
    <div className="table-responsive mt-3">
      <table className="table">
        <thead>
          <th>№</th>
          <th>Овог</th>
          <th>Нэр</th>
          <th>И-мэйл</th>
          <th>Огноо</th>
          <th>Үйлдлүүд</th>
        </thead>
        <tbody>
          {users.map(
            ({ id, firstname, lastname, email, createdDate }, index) => {
              const date = new Date(createdDate);

              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{lastname}</td>
                  <td>{firstname}</td>
                  <td>{email}</td>
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
                    <Button variant="secondary" onClick={() => onDelete(id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};
