import React, { useState, useEffect } from "react";
import {
  Grid,
  Row,
  Col,
  Table,
  OverlayTrigger,
  Tooltip,
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
import { CategoryListStyled } from "./style";
import Select from "react-select";
import { Formik } from "formik";
import * as yup from "yup";
import CreateMenuModal from "./CreateMenuModal";
import moment from "moment";
import Loader from "react-loader-spinner";

import img1 from "@assets/img/blog-1.jpg";
import img2 from "@assets/img/blog-2.jpg";
import img3 from "@assets/img/blog-3.jpg";
import img4 from "@assets/img/blog-4.jpg";
import img5 from "@assets/img/blog-5.jpg";

export default function CreateCategory() {
  const [state, setState] = useState({
    template: null,
    color_code: ""
  });
  const [menuSelected, setMenuSelected] = useState(null);
  const [genderSelected, setGenderSelected] = useState(null);
  const [show, setShow] = useState(false);
  const fetching = useSelector(state => state.fetching);
  const { items } = useSelector(state => state.category);
  console.log(fetching);
  console.log(items);
  const { type, status } = fetching;
  const [conditions, setConditions] = useState({
    category_name: "",
    gender: "",
    menu_name: ""
  });
  const dispatch = useDispatch();
  const view = <Tooltip id="view">View Profile</Tooltip>;
  const edit = <Tooltip id="edit">Edit Profile</Tooltip>;
  const remove = <Tooltip id="remove">Remove</Tooltip>;

  useEffect(() => {
    dispatch({
      type: ActionTypes.GET_CATEGORY_LIST_REQUEST
    });
  }, []);

  const actionsPost = () => {
    return (
      <td className="td-actions">
        <OverlayTrigger placement="left" overlay={viewPost}>
          <Button simple icon bsStyle="info">
            <i className="fa fa-image" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="left" overlay={editPost}>
          <Button simple icon bsStyle="success">
            <i className="fa fa-edit" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="left" overlay={removePost}>
          <Button simple icon bsStyle="danger">
            <i className="fa fa-times" />
          </Button>
        </OverlayTrigger>
      </td>
    );
  };

  const renderContent = () => {
    const { type, status } = fetching;
    if (type === ActionTypes.GET_CATEGORY_LIST_REQUEST && status) {
      return (
        <div style={{ textAlign: "center" }}>
          <Loader type="Circles" color="#36d7b7" height={25} width={25} />;
        </div>
      );
    }
    if (!items.length) {
      return (
        <div style={{ textAlign: "center" }}>
          <span>No record found</span>
        </div>
      );
    }
    return (
      <CategoryListStyled>
        <Table responsive className="table-bigboy">
          <thead>
            <tr>
              <th>Template</th>
              <th>Category Name</th>
              <th>Gender</th>
              <th>Menu</th>
              <th>Created At</th>
              <th>Views</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((item, key) => {
              return (
                <tr>
                  <td className="td-template">
                    <div className="img-container">
                      <img
                        alt="..."
                        src={process.env.MIX_APP_URL + item.template[0].url}
                        className="img-template"
                      />
                    </div>
                  </td>
                  <td className="td-gender">{item.name}</td>
                  <td className="td-gender">{item.gender}</td>
                  <td className="td-menu">{item.menu.name}</td>
                  <td className="td-created_at">
                    {moment(item.created_at).format("hh:mm:ss DD/MM/YYY")}
                  </td>
                  {actionsPost}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </CategoryListStyled>
    );
  };
  return (
    <div className="main-content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              textCenter
              title="Table Big Boy"
              category="A table for content management"
              tableFullWidth
              content={renderContent()}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}
