import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useState } from "react";
import Loading from "./Loading";
import Icon from "./Icon";

export default function AdminLayout() {
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = () => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/menu")
      .then(({ data: { status, result } }) => {
        console.log(status, result);
        if (status) setMenus(result);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <Container fluid className="p-0">
      <Row className="h-100">
        {loading && <Loading />}
        <Col sm={3}>
          <Navbar
            bg="light"
            expand="lg"
            className="d-flex flex-column text-white"
          >
            <Navbar.Brand href="#">Brand</Navbar.Brand>
            <Nav className="flex-column">
              {menus.map(({ menuName, link, iconName }, index) => {
                return (
                  <>
                    {menuName && (
                      <Link
                        key={index}
                        className="nav-link "
                        to={link ? link : "/api"}
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
        <Col sm={9}>
          <Navbar bg="light" className="p-3">
            <Container>
              <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <a href="#login">Mark Otto</a>
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
