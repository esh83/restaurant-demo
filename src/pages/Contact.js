import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function Contact() {
  const mode = useSelector((state) => state.theme.mode);
  const Label = ({ htmlFor, children }) => (
    <label
      className={`form-label ${mode === "light" ? "text-dark" : "text-light"}`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
  const FieldTheming = ({ children, ...props }) => (
    <Field
      {...props}
      className={`form-control ${mode === "light" ? "bg-light" : "bg-dark"}`}
    >
      {children}
    </Field>
  );
  return (
    <Container className="mt-5 mb-5">
      <h2 className="h3 text-center mb-4 text-primary">ارتباط با ما</h2>
      <Formik
        initialValues={{
          firstName: "",
          email: "",
          subject: "",
          part: 0,
          message: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(20, "کمتر از 20 کارکتر باشد")
            .required("این فیلد الزامی است"),
          email: Yup.string()
            .email("آدرس ایمیل نامعتبر است")
            .required("این فیلد الزامی است"),
          subject: Yup.string().required("این فیلد الزامی است"),
          part: Yup.number()
            .required("این فیلد الزامی است")
            .min(1, "این فیلد الزامی است"),
          message: Yup.string().required("این فیلد الزامی است"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 1500);
        }}
      >
        {(formik) => (
          <Form autoComplete="off">
            <Row>
              <Col md={6}>
                <div className="form-group">
                  <Label htmlFor="firstName">نام و نام خانوادگی</Label>
                  <FieldTheming
                    name="firstName"
                    type="text"
                    placeholder="نام خود را وارد نمایید"
                    className="form-control bg-dark"
                  />
                  <small className="form-text text-danger">
                    <ErrorMessage name="firstName" />
                  </small>
                </div>
              </Col>
              <Col md={6}>
                <div className="form-group">
                  <Label htmlFor="email">ایمیل</Label>
                  <FieldTheming
                    name="email"
                    type="text"
                    placeholder="ایمیل خود را وارد نمایید"
                    className="form-control"
                  />
                  <small className="form-text text-danger">
                    <ErrorMessage name="email" />
                  </small>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="form-group">
                  <Label htmlFor="email">موضوع</Label>
                  <FieldTheming
                    name="subject"
                    type="text"
                    placeholder="موضوع پیام را وارد نمایید"
                    className="form-control"
                  />
                  <small className="form-text text-danger">
                    <ErrorMessage name="subject" />
                  </small>
                </div>
              </Col>
              <Col md={6}>
                <div className="form-group">
                  <Label htmlFor="email">بخش مربوطه</Label>
                  <FieldTheming
                    name="part"
                    as="select"
                    className="form-control"
                  >
                    <option value="0">لطفا انتخاب کنید</option>
                    <option value="1">بخش اول</option>
                    <option value="2">بخش دوم</option>
                    <option value="3">بخش سوم</option>
                  </FieldTheming>
                  <small className="form-text text-danger">
                    <ErrorMessage name="part" />
                  </small>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="form-group">
                  <Label htmlFor="message">بخش مربوطه</Label>
                  <FieldTheming
                    name="message"
                    as="textarea"
                    className="form-control"
                    placeholder="پیام خود را وارد نمایید"
                    rows="6"
                  />

                  <small className="form-text text-danger">
                    <ErrorMessage name="message" />
                  </small>
                </div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
                    <Spinner
                      as="span"
                      animation="border"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "ارسال"
                  )}
                </button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Contact;
