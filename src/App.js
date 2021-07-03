import { client } from "./client";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    client
      .getEntries()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  return <div></div>;
}

export default App;
