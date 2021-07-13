import SpecialFoods from "../components/SpecialFoods";
import { fetchFoods } from "../redux-data/actions/foodsAction";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import FoodsSlider from "../components/FoodsSlider";
function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);
  
  return (
    <Container className='mt-5 mb-5'>
      <SpecialFoods />
      <FoodsSlider />
    </Container>
  );
}

export default Home;
