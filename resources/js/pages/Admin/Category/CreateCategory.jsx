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
import { SketchPicker, BlockPicker } from "react-color";
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
import AddTemplate from "./AddTemplate";
import Checkbox from "@components/CustomCheckbox/CustomCheckbox.jsx";

const schema = yup.object({
  name: yup.string().required("Please enter category name"),
  description: yup
    .string()
    .required("Please enter description")
    .max(1000, "Description must be less than 1000 characters")
});

export default function CreateCategory() {
  const [show, setShow] = useState(false);
  const fetching = useSelector(state => state.fetching);
  const { items } = useSelector(state => state.menu);
  const { type, status } = fetching;
  const [templates, setTemplates] = useState([
    {
      temp_front: null,
      temp_back: null,
      color_code: ""
    }
  ]);
  const [state, setState] = useState({
    menuSelected: null,
    genderSelected: null,
    apply_size: 0
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: ActionTypes.GET_MENU_REQUEST
    });
  }, []);

  const create = (values, { setSubmitting }) => {
    dispatch({
      type: ActionTypes.CREATE_NEW_CATEGORY_REQUEST,
      payload: {
        ...values,
        gender: state.genderSelected.label,
        menu_id: state.menuSelected.value,
        apply_size: state.apply_size,
        templates
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
        value={state.menuSelected}
        onChange={value => setState({ ...state, ["menuSelected"]: value })}
        options={selectItems}
      />
    );
  };

  const addTemplate = () => {
    setTemplates([
      ...templates,
      {
        temp_front: null,
        temp_back: null,
        color_code: ""
      }
    ]);
  };

  const applySize = () => {
    setState({ ...state, ["apply_size"]: state.apply_size ? 0 : 1 });
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
                      menu_id: null,
                      apply_size: false
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
                            {!state.menuSelected && (
                              <small className="text-danger">
                                Please select menu first
                              </small>
                            )}
                          </FormGroup>
                          <FormGroup>
                            <Checkbox
                              isChecked={state.apply_size}
                              onClick={() => applySize()}
                              number="1"
                              label="Apply Size"
                            />
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
                              value={state.genderSelected}
                              onChange={value =>
                                setState({
                                  ...state,
                                  ["genderSelected"]: value
                                })
                              }
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
              <Button className="btn-add-temp" onClick={() => addTemplate()}>
                Add
              </Button>
              <div>
                {templates.map((template, idx) => {
                  return (
                    <Col md={4} key={idx}>
                      <AddTemplate
                        index={idx}
                        templates={templates}
                        setTemplates={setTemplates}
                      />
                    </Col>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Grid>
      </CreateCategoryStyled>
    </div>
  );
}
