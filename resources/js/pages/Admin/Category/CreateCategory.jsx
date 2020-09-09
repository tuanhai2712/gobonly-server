import React, { useState } from "react";
import {
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "@actions";
import Card from "@components/Card/Card.jsx";
import Button from "@components/CustomButton/CustomButton.jsx";
import Success from "@components/Alert/Success.jsx";
import ImageUploader from "react-images-upload";
import { SketchPicker } from "react-color";
import { ColorCodeStyled, CreateCategoryStyled } from "./style";
import Loader from "react-loader-spinner";

import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Please enter category name"),
  description: yup
    .string()
    .required("Please enter description")
    .max(1000, "Description must be less than 1000 characters")
});

export default function CreateCategory() {
  const [state, setState] = useState({
    template: null,
    color_code: ""
  });
  const fetching = useSelector(state => state.fetching);
  const { type, status } = fetching;
  const dispatch = useDispatch();
  const onDrop = file => {
    setState({ ...state, ["template"]: file.length ? file[0] : null });
  };

  const changeColor = color => {
    setState({ ...state, ["color_code"]: color.hex });
  };

  const create = (values, { setSubmitting }) => {
    if (!state.template || !state.color_code) {
      return;
    }
    dispatch({
      type: ActionTypes.CREATE_NEW_CATEGORY_REQUEST,
      payload: { ...values, ...state }
    });
    setSubmitting(false);
  };

  return (
    <div className="main-content">
      <CreateCategoryStyled>
        <Success
          successType={ActionTypes.CREATE_NEW_CATEGORY_SUCCESS}
          mess="Create New Category Success"
        />
        <Grid fluid>
          <Row>
            <Col md={6}>
              <Card
                title="Create New Category"
                content={
                  <Formik
                    validationSchema={schema}
                    initialValues={{
                      name: "",
                      description: ""
                    }}
                    onSubmit={create}
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
                            <ControlLabel>
                              Category Name: <span className="star">*</span>
                            </ControlLabel>
                            <FormControl
                              type="text"
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                            />
                            {errors.name && touched.name && (
                              <small className="text-danger">
                                {errors.name}
                              </small>
                            )}
                          </FormGroup>
                          <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>
                              Description: <span className="star">*</span>
                            </ControlLabel>
                            <FormControl
                              componentClass="textarea"
                              name="description"
                              value={values.description}
                              onChange={handleChange}
                            />
                            {errors.description && touched.description && (
                              <small className="text-danger">
                                {errors.description}
                              </small>
                            )}
                          </FormGroup>
                          <Button
                            type="submit"
                            disabled={
                              type ===
                                ActionTypes.CREATE_NEW_CATEGORY_REQUEST &&
                              status
                            }
                            bsStyle="info"
                            fill
                            pullRight
                          >
                            {type === ActionTypes.CREATE_NEW_CATEGORY_REQUEST &&
                            status ? (
                              <Loader
                                type="Circles"
                                color="#36d7b7"
                                height={25}
                                width={25}
                              />
                            ) : (
                              "Create New Category"
                            )}
                          </Button>
                        </Form>
                      );
                    }}
                  </Formik>
                }
              />
            </Col>
            <Col md={6}>
              <ImageUploader
                withIcon={true}
                buttonText="Select template"
                label={"Template for category"}
                onChange={onDrop}
                singleImage={true}
                imgExtension={[".png"]}
                withPreview={true}
              />
              {!state.template && (
                <small className="text-danger">
                  Please upload template for category
                </small>
              )}
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>
                  Color Code: <span className="star">*</span>
                </ControlLabel>
                <ColorCodeStyled style={{ backgroundColor: state.color_code }}>
                  {state.color_code}
                </ColorCodeStyled>
                {!state.color_code && (
                  <small className="text-danger">
                    Please select color code
                  </small>
                )}
                <SketchPicker
                  color={state.color_code}
                  onChangeComplete={color => changeColor(color)}
                />
              </FormGroup>
            </Col>
          </Row>
        </Grid>
      </CreateCategoryStyled>
    </div>
  );
}
