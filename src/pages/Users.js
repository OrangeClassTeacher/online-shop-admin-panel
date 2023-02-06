import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSearchParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/esm/FormLabel";
import axios from "axios";

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
      .get("http://localhost:8000/api/user")
      .then(({ data: { status, result } }) => {
        console.log(status, result);
        if (status) setUsers(result);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const onSave = (menuItem) => {
    axios
      .post("http://localhost:8000/api/user", menuItem)
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
  };
  return (
    <div className="row mx-auto">
      <div className="col-md-12 col-xs-8 ">
        <div className="d-flex justify-content-between aligns-item-center">
          <h2>{title}</h2>
          <Button
            variant="primary"
            onClick={() => setSearchParams({ p: "new" })}
          >
            New
          </Button>
        </div>
        <UserList
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          users={users}
        />
        {searchParams.get("p") == "new" && (
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

const UserList = ({
  users,

  searchParams,
  setSearchParams,
}) => {
  const [selected, setSelected] = useState([]);

  return (
    <div className="table-responsive mt-3">
      <table className="table">
        <thead>
          <th>№</th>
          <th>Овог</th>
          <th>Нэр</th>
          <th>Хэрэглэгчийн нэр</th>
          <th>Огноо</th>
        </thead>
        <tbody>
          {users.map(
            (
              {
                id,
                firstname,
                lastname,
                username,
                password,
                email,
                createdDate,
              },
              index
            ) => (
              <tr>
                <td>{index + 1}</td>
                <td>{lastname}</td>
                <td>{firstname}</td>
                <td>{username}</td>
                {/* <td>{let date = new Date(createdDate)}</td> */}
                <td>
                  <Button
                    className="mx-2"
                    onClick={() => {
                      setSearchParams({ p: "new" });
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="secondary">Delete</Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

const UserNew = ({ searchParams, setSearchParams, title, onSave }) => {
  const [show, setShow] = useState(searchParams && true);

  const init = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
  };
  const [userItem, setUserItem] = useState(init);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState([]);

  const onClose = () => {
    setSearchParams({});
    setShow(false);
  };

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
                console.log(e.target.value);
                setUserItem({ ...userItem, password: e.target.value });

                // console.log(reg.exec(e.target.value));

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
