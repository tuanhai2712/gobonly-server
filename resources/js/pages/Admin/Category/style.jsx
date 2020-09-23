import styled from "styled-components";

export const CreateCategoryStyled = styled.div`
  textarea {
    height: 200px;
    resize: none;
  }

  .fileContainer {
    margin-top: 0px;
    margin-bottom: 10px;
  }
  .add-template-container {
    display: flex;
    padding: 10px;
    border: 1px solid #a69a9a;
    margin-bottom: 10px;
    background-color: #d3c9c9;
  }
  .btn-add-temp {
    margin-left: 15px;
    margin-bottom: 20px;
  }
  .btn-upload-template {
    display: flex;
    flex-direction: column;
    > button {
      width: 70px;
      height: 70px;
      margin-right: 10px;
      background-size: cover;
      > i {
        font-size: 30px;
      }
    }
  }
`;

export const ColorCodeStyled = styled.div`
  .block-picker > div:first-child {
    display: none;
  }

  .color-select {
    width: 30px;
    height: 30px;
    border-radius: 15px;
    border: 5px solid #ac9898;
  }
  .color-select:hover {
    cursor: pointer;
  }
`;

export const SelectMenuStyled = styled.div`
  display: flex;
  .react-select {
    flex: 1;
  }
  .add-menu-btn {
    padding: 0px;
    border: unset;
    margin-left: 5px;
    align-items: center;
    display: flex;
    .pe-7s-plus:before {
      font-size: 27px;
    }
  }
`;

export const CategoryListStyled = styled.div`
  .img-container {
  }
  .img-template {
    width: 120px !important;
  }
`;
