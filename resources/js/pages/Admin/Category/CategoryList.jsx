import React, { useState, useEffect } from "react";
import {
  Grid,
  Row,
  Col,
  Table,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "@actions";
import Card from "@components/Card/Card.jsx";
import Button from "@components/CustomButton/CustomButton.jsx";
import RegularPagination from "@components/Pagination/Pagination.jsx";
import Select from "react-select";
import moment from "moment";
import Loader from "react-loader-spinner";
import { isEmpty } from "lodash";
import EditCategory from "./EditCategory";
import { CategoryListStyled } from "./style";

export default function CategoryList() {
  const [menuSelected, setMenuSelected] = useState(null);
  const fetching = useSelector(state => state.fetching);
  const { categories } = useSelector(state => state.categories);
  const menu = useSelector(state => state.menu);
  const [conditions, setConditions] = useState({
    menu_id: "",
    page: 1
  });
  const [showEdit, setShowEdit] = useState({
    show: false,
    item: {}
  });
  const dispatch = useDispatch();
  const editCategory = <Tooltip id="edit">Edit Category</Tooltip>;
  const removeCategory = <Tooltip id="remove">Remove Category</Tooltip>;

  useEffect(() => {
    dispatch({
      type: ActionTypes.GET_MENU_REQUEST
    });
    dispatch({
      type: ActionTypes.GET_CATEGORY_LIST_REQUEST,
      conditions
    });
  }, []);

  const handleMenuSelect = menu => {
    setMenuSelected(menu);
    setConditions({ ...conditions, ["menu_id"]: menu.value });
  };
  const renderMenuList = () => {
    let selectItems = [
      {
        value: 0,
        label: "Menu Option",
        isDisabled: true
      }
    ];
    menu.items.map((item, idx) => {
      selectItems.push({ value: item.id, label: item.name });
    });
    return (
      <Select
        className="react-select primary"
        classNamePrefix="react-select"
        value={menuSelected}
        onChange={value => handleMenuSelect(value)}
        options={selectItems}
      />
    );
  };

  const handleChangePage = currentPage => {
    setConditions({ ...conditions, ["page"]: currentPage });
    dispatch({
      type: ActionTypes.GET_CATEGORY_LIST_REQUEST,
      conditions: {
        menu_id: conditions.menu_id,
        page: currentPage
      }
    });
  };
  const search = () => {
    dispatch({
      type: ActionTypes.GET_CATEGORY_LIST_REQUEST,
      conditions
    });
  };

  const edit = item => {
    setShowEdit({
      status: true,
      item
    });
  };

  const back = () => {
    setShowEdit({
      status: false,
      item: {}
    });
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
    if (isEmpty(categories)) {
      return (
        <div style={{ textAlign: "center" }}>
          <span>No record found</span>
        </div>
      );
    }
    if (showEdit.status) {
      return <EditCategory item={showEdit.item} back={() => back()} />;
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
              <th />
            </tr>
          </thead>
          <tbody>
            {categories.data.map((item, key) => {
              return (
                <tr key={key}>
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
                    {moment(item.created_at).format("hh:mm:ss DD/MM/YYYY")}
                  </td>
                  <td>
                    <OverlayTrigger placement="left" overlay={editCategory}>
                      <Button
                        simple
                        icon
                        bsStyle="success"
                        onClick={() => edit(item)}
                      >
                        <i className="fa fa-edit" />
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="left" overlay={removeCategory}>
                      <Button simple icon bsStyle="danger">
                        <i className="fa fa-times" />
                      </Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="content" style={{ textAlign: "end" }}>
          <RegularPagination
            totalItems={categories.total}
            pageSize={10}
            handleChangePage={page => handleChangePage(page)}
            currentPage={conditions.page}
          />
        </div>
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
              title="Filter Conditions"
              tableFullWidth
              content={
                <div>
                  <Col md={3}>{renderMenuList()}</Col>
                  <Button onClick={() => search()}>Search</Button>
                </div>
              }
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card
              textCenter
              title="Category List"
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
