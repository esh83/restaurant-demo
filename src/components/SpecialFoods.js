import { useSelector } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
export const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const Loading = keyframes`
100% {
  transform: translateX(100%);
}
`;
export const Preload = styled.div`
  display: inline-block;
  height: ${props => props.height ? props.height : '300px'};
  position: relative;
  overflow: hidden;
  background-color: #dddbdd;
  width: 100%;
  margin-bottom: 20px;
  &::after {
    content: "";

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0)
    );
    animation: ${Loading} 2s infinite;
  }
`;

function SpecialFoods() {
  const state = useSelector((state) => state.foods);
  const mode = useSelector((state) => state.theme.mode);
  const preloadingCount = [1, 2, 3];
  const spcfoods = state.data.filter(
    (food) => food.fields.isAvailable && food.fields.special
  );
  return (
    <>
      <h2 className="h3 text-primary text-center mb-5">پیشنهاد ویژه امروز</h2>
      <Row>
        {state.loading || (!state.data && !state.error) ? (
          preloadingCount.map((count) => (
            <Col lg={4} sm={6} key={count}>
              <Preload />
            </Col>
          ))
        ) : state.error ? (
          <h4>{state.error}</h4>
        ) : !spcfoods.length && !state.error ? <h4>پیشنهاد ویژه موجود نیست</h4> :(
          spcfoods.slice(0, 3).map((food, index) => (
            <Col lg={4} sm={6} className="mb-4 mx-auto" key={index}>
              <Card
                dir="rtl"
                bg={mode === "light" ? "light" : "dark"}
                border={"light"}
                text={mode === "light" ? "dark" : "light"}
                className={"shadow h-100"}
              >
                <Card.Img
                  variant="top"
                  src={food.fields.image.fields.file.url}
                  height="210"
                  style={{ objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{food.fields.title}</Card.Title>
                  <Card.Text className="small">
                    {food.fields.shortDesc}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <CardFooter>
                    <small className="text-muted">
                      {food.fields.price.toLocaleString()} تومان
                    </small>
                    <Link
                      to={`/foods/${food.sys.id}`}
                      className="btn btn-secondary"
                    >
                      سفارش
                    </Link>
                  </CardFooter>
                </Card.Footer>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </>
  );
}

export default SpecialFoods;
