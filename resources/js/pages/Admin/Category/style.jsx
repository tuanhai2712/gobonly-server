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
`;

export const ColorCodeStyled = styled.div`
  width: 60px;
  height: 60px;
  border: 1px solid #897f7f;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
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
