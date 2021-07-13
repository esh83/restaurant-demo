import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FaTelegramPlane, FaInstagram, FaSun, FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { themeToggle } from "../redux-data/actions/themeActions";
import { NavLink } from "react-router-dom";
function NavbarHeader() {
  const themeMode = useSelector((state) => state.theme.mode);
  const dispath = useDispatch();
  return (
    <div>
      <Navbar
        expand="md"
        bg={themeMode === "light" ? "light" : "dark"}
        variant={themeMode === "light" ? "light" : "dark"}
        className="shadow-sm"
      >
        <NavLink className="fnt-bold navbar-brand" to="/">
          نوا فود
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-Navbar-nav" />
        <Navbar.Collapse
          id="responsive-Navbar-nav"
          style={{ textAlign: "right", transition: ".3s" }}
        >
          <Nav className="ml-md-5 ml-3">
            <NavDropdown title="دسته بندی" className='mr-3'>
              <NavLink to="/foods/cat/kebab" className="dropdown-item">
                کباب ها
              </NavLink>
              <NavLink to="/foods/cat/fastfood" className="dropdown-item">
                فست فود
              </NavLink>
              <NavLink to="/foods/cat/soda" className="dropdown-item">
                نوشیدنی
              </NavLink>
              <NavDropdown.Divider />
              <NavLink to="/foods/cat/all" className="dropdown-item">
                همه غذا ها
              </NavLink>
            </NavDropdown>
            <NavLink to="/about" className="nav-link mr-3">
              درباره ما
            </NavLink>
            <NavLink to="/contact" className="nav-link">
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
