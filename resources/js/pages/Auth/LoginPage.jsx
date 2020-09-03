import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
// components
import Card from "@components/Card/Card.jsx";
import Footer from "@components/Footer/Footer.jsx";
import Button from "@components/CustomButton/CustomButton.jsx";
// image
import bgImage from "@assets/img/full-screen-image-3.jpg";
// library
import { Formik } from "formik";
import * as yup from "yup";
// style
import { LoginPageStyled } from "./style";
import { ActionTypes } from "@actions";

const schema = yup.object({
  email: yup
    .string()
    .required("Please enter email")
    .email("Email is not valid"),
  password: yup
    .string()
    .required("Please enter password")
    .min(6, "Password has at least 6 characters")
});

function LoginPage() {
  const [cardHidden, setCardHidden] = useState(true);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  useEffect(() => {
    setTimeout(() => setCardHidden(false), 700);
  }, []);

  const submitLogin = (values, { setSubmitting }) => {
    dispatch({
      type: ActionTypes.USER_LOGIN_REQUEST,
      payload: values,
      history
    });
    setSubmitting(false);
  };
  return (
    <LoginPageStyled>
      <div className="wrapper wrapper-full-page">
        <div
          className="full-page login-page"
          data-color="black"
          data-image={bgImage}
        >
          <div className="content">
            <Grid>
              <Row>
                <Col md={4} sm={6} mdOffset={4} smOffset={3}>
                  <Card
                    hidden={cardHidden}
                    textCenter
                    title="Login To Admin System"
                    content={
                      <Formik
                        validationSchema={schema}
                        initialValues={{ email: "", password: "" }}
                        onSubmit={submitLogin}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleSubmit,
                          isSubmitting
                        }) => {
                          return (
                            <Form noValidate onSubmit={handleSubmit}>
                              <FormGroup>
                                <ControlLabel>Email Address</ControlLabel>
                                <FormControl
                                  type="text"
                                  name="email"
                                  placeholder="Enter email"
                                  autoComplete="off"
                                  value={values.email}
                                  onChange={handleChange}
                                />
                                {errors.email && touched.email && (
                                  <span>{errors.email}</span>
                                )}
                              </FormGroup>
                              <FormGroup>
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                  type="password"
                                  name="password"
                                  autoComplete="off"
                                  value={values.password}
                                  placeholder="Enter password"
                                  onChange={handleChange}
                                />
                                {errors.password && touched.password && (
                                  <span>{errors.password}</span>
                                )}
                              </FormGroup>
                              <Button
                                variant="info"
                                type="submit"
                                disabled={isSubmitting}
                                className="login-btn"
                              >
                                Login
                              </Button>
                            </Form>
                          );
                        }}
                      </Formik>
                    }
                    ftTextCenter
                  />
                </Col>
              </Row>
            </Grid>
          </div>
          <Footer transparent />
          <div
            className="full-page-background"
            style={{ backgroundImage: "url(" + bgImage + ")" }}
          />
        </div>
      </div>
    </LoginPageStyled>
  );
}

export default LoginPage;
