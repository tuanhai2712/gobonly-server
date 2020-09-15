import React, { useState, useEffect } from "react";
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
import {
  ColorCodeStyled,
  CreateCategoryStyled,
  SelectMenuStyled
} from "./style";
import Loader from "react-loader-spinner";
import Select from "react-select";
import { Formik } from "formik";
import * as yup from "yup";
import CreateMenuModal from "./CreateMenuModal";
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
  const [menuSelected, setMenuSelected] = useState(null);
  const [genderSelected, setGenderSelected] = useState(null);
  const [show, setShow] = useState(false);
  const fetching = useSelector(state => state.fetching);
  const { items } = useSelector(state => state.menu);
  const { type, status } = fetching;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: ActionTypes.GET_MENU_REQUEST
    });
  }, []);
  const onDrop = file => {
    setState({ ...state, ["template"]: file.length ? file[0] : null });
  };

  const changeColor = color => {
    setState({ ...state, ["color_code"]: color.hex });
  };

  const create = (values, { setSubmitting }) => {
    if (!state.template || !state.color_code || !menuSelected) {
      return;
    }
    dispatch({
      type: ActionTypes.CREATE_NEW_CATEGORY_REQUEST,
      payload: {
        ...values,
        ...state,
        menu_id: menuSelected.value,
        gender: genderSelected.label
      }
    });
    setSubmitting(false);
  };

  const renderMenuList = () => {
    let selectItems = [
      {
        value: 0,
        label: "Menu Option",
        isDisabled: true
      }
    ];
    items.map((item, idx) => {
      selectItems.push({ value: item.id, label: item.name });
    });
    return (
      <Select
        className="react-select primary"
        classNamePrefix="react-select"
        value={menuSelected}
        onChange={value => setMenuSelected(value)}
        options={selectItems}
      />
    );
  };
  return (
    <div className="main-content">
      <CreateCategoryStyled>
        <Success
          successType={ActionTypes.CREATE_NEW_CATEGORY_SUCCESS}
          mess="Create New Category Success"
        />
        {show && <CreateMenuModal show={show} close={() => setShow(status)} />}
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
                      description: "",
                      menu_id: null
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
                              Menu: <span className="star">*</span>
                            </ControlLabel>
                            <SelectMenuStyled>
                              {type === ActionTypes.GET_MENU_REQUEST ? (
                                <Loader
                                  type="Circles"
                                  color="#36d7b7"
                                  height={25}
                                  width={25}
                                />
                              ) : (
                                renderMenuList()
                              )}
                              <Button
                                className="add-menu-btn"
                                onClick={() => setShow(true)}
                              >
                                <i className="pe-7s-plus"></i>
                              </Button>
                            </SelectMenuStyled>
                            {!menuSelected && (
                              <small className="text-danger">
                                Please select menu first
                              </small>
                            )}
                          </FormGroup>

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
                          <FormGroup>
                            <ControlLabel>
                              Gender: <span className="star">*</span>
                            </ControlLabel>
                            <Select
                              className="react-select primary"
                              classNamePrefix="react-select"
                              value={genderSelected}
                              onChange={value => setGenderSelected(value)}
                              options={[
                                {
                                  value: 0,
                                  label: "Gender Option",
                                  isDisabled: true
                                },
                                { value: 1, label: "Male" },
                                { value: 2, label: "Female" },
                                { value: 3, label: "All" }
                              ]}
                            />
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
