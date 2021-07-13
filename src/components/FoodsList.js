import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchFoods } from "../redux-data/actions/foodsAction";
import Pagination from "./Pagination";
import { Card, Col, Container , Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CardFooter ,Preload } from "./SpecialFoods";

function FoodsList() {
  const mode = useSelector((state) => state.theme.mode);
  const Food = ({ data }) => {
    return (
      <Col lg={4} sm={6} className="mb-4">
        <Card
          dir="rtl"
          bg={mode === "light" ? "light" : "dark"}
          border={"light"}
          text={mode === "light" ? "dark" : "light"}
          className={"shadow h-100"}
        >
          <Card.Img
            variant="top"
            src={data.fields.image.fields.file.url}
            height="210"
            style={{ objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title>{data.fields.title}</Card.Title>
            <Card.Text className="small">{data.fields.shortDesc}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <CardFooter>
              <small className="text-muted">
                {data.fields.price.toLocaleString()} تومان
              </small>
              <Link to={`/foods/${data.sys.id}`} className="btn btn-secondary">
                سفارش
              </Link>
            </CardFooter>
          </Card.Footer>
        </Card>
      </Col>
    );
  };
  const { id } = useParams();

  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.foods);
  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);
  let foods = [];
  let foodsTitle = "";
  
  switch (id) {
    case "all":
      foodsTitle = "همه غذا ها";
      break;
    case "kebab":
      foodsTitle = "کباب ها";
      break;
    case "fastfood":
      foodsTitle = "فست فود ها";
      break;
    case "soda":
      foodsTitle = "نوشیدنی ها";
      break;
    default:
      foodsTitle = "";
      break;
  }
  if (data.length) {
    id === "all"
      ? (foods = data.filter(
          (item, index) => item.fields.isAvailable && index > 0
        ))
      : (foods = data.filter(
          (item) =>
            item.metadata.tags[0].sys.id === id && item.fields.isAvailable
        ));
  }
  

  return (
    <Container className='mt-5 mb-5'>
      {loading || (!data.length && !error) ? (
        <>
        <h2 className='h3 text-center text-primary'>در حال بارگذاری ...</h2>
        <Row className='mt-5'>
          <Col lg={4} sm={6}>
          <Preload />
        </Col>
          <Col lg={4} sm={6} >
          <Preload />
        </Col>
          <Col lg={4} sm={6}>
          <Preload />
        </Col>
        </Row>
        </>
      ) : error ? (
        <div dir='rtl'>خطایی پیش آمد</div>
      ) : !foods.length && !error ? (
        <div dir='rtl'>دسته بندی مورد نظر وجود نداشته و یا خالی میباشد</div>
      ) : (
        <div>
          <Pagination
            data={foods}
            RenderComponent={Food}
            title={`لیست ${foodsTitle}`}
            pageLimit={4}
            dataLimit={6}
            id={id}
          />
        </div>
      )}
    </Container>
  );
}

export default FoodsList;
