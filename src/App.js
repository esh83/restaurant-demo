import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import NavbarHeader from "./components/Navbar";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import PageLoader from "./components/PageLoader";
import NotFound from "./components/NotFound";
import Basket from "./components/Basket";
import ScrollTop from "./components/ScrollTop";
const Home = React.lazy(() => import("./pages/Home"));
const FoodIndex = React.lazy(() => import("./pages/foods/FoodIndex"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
function App() {
  const mode = useSelector((state) => state.theme.mode);
  mode === "dark"
    ? (document.body.style.backgroundColor = "#343A40")
    : (document.body.style.backgroundColor = "#ffffff");
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Container fluid className="px-0">
          <NavbarHeader />
        </Container>
        <ScrollTop>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/foods">
              <FoodIndex />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
            <Route path="/404">
              <NotFound />
            </Route>
          </Switch>
        </ScrollTop>
        <Container fluid className="px-0">
          <Basket />
          <Footer />
        </Container>
      </Suspense>
    </Router>
  );
}

export default App;
