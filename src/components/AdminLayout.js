import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Container, Nav, Navbar, Row, Col, Button } from "react-bootstrap";

import { url } from "./constant";
import Loading from "./Loading";
import Icon from "./Icon";
import useFetch from "../custom-hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const { data, error, loading } = useFetch(url + "/menu", {});
  const navigate = useNavigate();
  const [userInfo, setInfo] = useState({});

  useEffect(() => {
    localStorage.getItem("user")
      ? setInfo(JSON.parse(localStorage.getItem("user")))
      : navigate("/");
  }, []);

  if (error) {
    return <h5>Aldaa garlaa</h5>;
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <Container fluid className="p-0">
      <Row>
        <Col sm={3} className="bg-light p-0">
          <Navbar
            bg="light"
            expand="lg"
            className="d-flex flex-column text-white"
          >
            <Navbar.Brand href="#">Orange shop</Navbar.Brand>
            <Nav className="flex-column">
              {data &&
                data.map(({ menuName, link, iconName }, index) => {
                  return (
                    <>
                      {menuName && (
                        <Link
                          key={index}
                          className="nav-link "
                          to={link ? "/admin" + link : "/api"}
                        >
                          <Icon iconName={iconName} />
                          {menuName && menuName}
                        </Link>
                      )}
                    </>
                  );
                })}
            </Nav>
          </Navbar>
        </Col>
        <Col sm={9} className="p-0">
          <Navbar bg="dark" className="p-3">
            <Container>
              <Navbar.Brand href="#home" className="text-light">
                Admin Panel
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                {/* <Button>Log In</Button> */}
                <Navbar.Text className="text-light me-2">
                  <i class="bi bi-person"></i> <span>{userInfo.firstname}</span>
                </Navbar.Text>
                <Navbar.Text
                  className="btn btn-secondary"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/");
                  }}
                >
                  Log Out
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
