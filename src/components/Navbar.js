import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FaTelegramPlane, FaInstagram, FaSun, FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { themeToggle } from "../redux-data/actions/themeActions";
import { NavLink } from "react-router-dom";
import { useState } from "react";
function NavbarHeader() {
  const themeMode = useSelector((state) => state.theme.mode);
  const dispath = useDispatch();
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <Navbar
        expand="md"
        bg={themeMode === "light" ? "light" : "dark"}
        variant={themeMode === "light" ? "light" : "dark"}
        className="shadow-sm"
        expanded={expanded}
      >
        <NavLink className="fnt-bold navbar-brand" to="/">
          نوا فود
        </NavLink>
        <Navbar.Toggle
          onClick={() =>
            setTimeout(() => {
              setExpanded(!expanded);
            }, 10)
          }
        />
        <Navbar.Collapse style={{ textAlign: "right", transition: ".3s" }}>
          <Nav className="ml-md-5 ml-3">
            <NavDropdown title="دسته بندی" className="mr-3">
              <NavLink
                to="/foods/cat/kebab"
                className="dropdown-item"
                onClick={() => setExpanded(false)}
              >
                کباب ها
              </NavLink>
              <NavLink
                to="/foods/cat/fastfood"
                className="dropdown-item"
                onClick={() => setExpanded(false)}
              >
                فست فود
              </NavLink>
              <NavLink
                to="/foods/cat/soda"
                className="dropdown-item"
                onClick={() => setExpanded(false)}
              >
                نوشیدنی
              </NavLink>
              <NavDropdown.Divider />
              <NavLink
                to="/foods/cat/all"
                className="dropdown-item"
                onClick={() => setExpanded(false)}
              >
                همه غذا ها
              </NavLink>
            </NavDropdown>
            <NavLink
              to="/about"
              className="nav-link mr-3"
              onClick={() => setExpanded(false)}
            >
              درباره ما
            </NavLink>
            <NavLink
              to="/contact"
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              راه ارتباطی
            </NavLink>
          </Nav>
          <Nav className="ml-md-auto ml-3">
            <Nav.Link onClick={() => dispath(themeToggle())}>
              {themeMode === "light" ? <FaSun /> : <FaMoon />}
            </Nav.Link>
            <Nav.Link href="https://t.me/" target="_blank">
              <FaTelegramPlane />
            </Nav.Link>
            <Nav.Link href="https://instagram.com" target="_blank">
              <FaInstagram />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarHeader;
