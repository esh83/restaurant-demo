import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchSingleFood } from "../../redux-data/actions/singleFoodsAction";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/foodSingle.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import marked from "marked";
import OrderFood from "../../components/OrderFood";
import MapUser from "../../components/map/Map";
function FoodSingle() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleFood(id));
  }, [dispatch, id]);
  const { error, loading, data } = useSelector((state) => state.singleFood);
  const mode = useSelector((state) => state.theme.mode);
  return (
    <>
      <Container className="mt-5 mb-5" dir="rtl">
        {loading || (!Object.keys(data).length && !error) ? (
          <Row>
            <Col md={4} lg={3}>
              <div className={styles.imgPreload}></div>
            </Col>
            <Col md={8} lg={5}>
              <div className={styles.titlePreload}></div>
              <div className={styles.contentPreload}></div>
            </Col>
            <Col md={12} lg={4}>
              <div className={styles.counterPreload}></div>
            </Col>
            <Col className="mt-4">
              <div className={styles.mapPreload}></div>
            </Col>
          </Row>
        ) : error ? (
          <h5>{error}</h5>
        ) : (
          <>
            <section className={`${styles.foodInfo}`}>
              <Row className={mode === "light" ? "text-dark" : "text-light"}>
                <Col md={4} lg={3}>
                  <div className={styles.image}>
                    <img src={data.fields.image.fields.file.url} alt="" />
                  </div>
                </Col>
                <Col md={8} lg={5}>
                  <div className={styles.info}>
                    <h1>{data.fields.title}</h1>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: marked(data.fields.fullDesc),
                      }}
                    />
                  </div>
                </Col>
                <Col md={12} lg={4} className="mt-lg-0 mt-3 mb-2">
                  <OrderFood
                    price={data.fields.price}
                    title={data.fields.title}
                    id={id}
                    isAvailable={data.fields.isAvailable}
                  />
                </Col>
              </Row>
            </section>
            <hr />
            <section>
              <Row className="mt-4">
                <Col>
                  <MapUser />
                </Col>
              </Row>
            </section>
          </>
        )}
      </Container>
    </>
  );
}

export default FoodSingle;
