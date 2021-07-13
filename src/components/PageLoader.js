import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
function PageLoader() {
  const mode = useSelector((state) => state.theme.mode);
  const lightStyles = {
    position: "fixed",
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    top: "0",
    right: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const darkStyles = {
    position: "fixed",
    width: "100%",
    height: "100%",
    backgroundColor: "#343A40",
    top: "0",
    right: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={mode === "light" ? lightStyles : darkStyles}>
      <Spinner
        animation="border"
        role="status"
        variant={mode === "light" ? "dark" : "light"}
      />
    </div>
  );
}

export default PageLoader;
