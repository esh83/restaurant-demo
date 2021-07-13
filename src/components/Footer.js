import styles from "../styles/footer.module.scss";
import { Row, Col, Container, FormControl, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
function Footer() {
  const mode = useSelector((state) => state.theme.mode);
  return (
    <footer
      className={`${mode === "light" ? "bg-light" : "bg-dark"} ${
        styles.footer
      }`}
    >
      <Container fluid>
        <Row dir="rtl">
          <Col md={4} className="text-center">
            <div className={styles.about}>
              <h3 className={mode === "light" ? "text-dark" : "text-light"}>
                درباره ما
              </h3>
              <p className={mode === "light" ? "text-dark" : "text-light"}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان
                جامعه و متخصصان را می طلبد
              </p>
            </div>
          </Col>
          <Col md={4} className="text-center">
            <h3 className={mode === "light" ? "text-dark" : "text-light"}>
              لینک های کاربردی
            </h3>
            <div className={styles.linkrow}>
              <div className={styles.linkcol}>
                <a target="_blank" href="/">
                  لینک اول
                </a>
                <a target="_blank" href="/">
                  لینک اول
                </a>
                <a target="_blank" href="/">
                  لینک اول
                </a>
                <a target="_blank" href="/">
                  لینک اول
                </a>
                <a target="_blank" href="/">
                  لینک اول
                </a>
              </div>
              <div className={styles.linkcol}>
                <a target="_blank" href="/">
                  لینک اول
                </a>
                <a target="_blank" href="/">
                  لینک اول
                </a>
                <a target="_blank" href="/">
                  لینک اول
                </a>
                <a target="_blank" href="/">
                  لینک اول
                </a>
                <a target="_blank" href="/">
                  لینک اول
                </a>
              </div>
            </div>
          </Col>
          <Col md={4} className="text-center">
            <form onSubmit={(e) => e.preventDefault()}>
              <h3 className={mode === "light" ? "text-dark" : "text-light"}>
                عضویت در خبرنامه
              </h3>
              <FormControl placeholder="ایمیل خود را وارد کنید ..." />
              <Button className="mt-4" type="submit">
                ارسال
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
