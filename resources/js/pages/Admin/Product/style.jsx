import styled from "styled-components";

export const CreateProductStyled = styled.div`
  .product-section-select {
    display: flex;
    border: 1px solid #fc6514;
    padding: 7px 14px;
    position: relative;
    > i {
      position: absolute;
      right: 1rem;
      font-size: 30px;
    }
    > i:hover {
      cursor: pointer;
    }
    .category-info {
      padding: 10px;
      margin-left: 20px;
    }
    .category-name {
      color: #434a54;
      border-collapse: separate;
      border-spacing: 0;
      text-transform: capitalize;
      font-size: 16px;
    }

    .color-item {
      width: 20px;
      height: 20px;
      border-radius: 10px;
      box-shadow: inset 0 0 0 1px #777;
      margin-top: 10px;
    }
  }

  .btn-add-category {
    width: 100%;
    border: 1px solid #fc6514;
    margin-top: 15px;
    > i {
      font-size: 30px;
      color: #fc6514;
    }
  }

  .cl-btn {
    width: 30px;
    height: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .bg-temp-container {
    flex: 1;
    height: 500px;
    position: relative;
    background-size: cover !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-draggable {
    cursor: grab;
    display: flex;
    flex-wrap: wrap;
    transform: translate(0px, 0px);
    align-items: center;
    justify-content: center;
  }
  .config-size-logo-container {
    display: flex;
  }
`;

export const SelectTemplateModalStyled = styled.div`
  .header-modal {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > span {
      line-height: 1.2857em;
      font-weight: 700;
      color: #f35b25;
      font-size: 18px;
    }
  }

  .back-btn {
    align-items: center;
    border: unset;
    justify-content: center;
    text-align: center;
    display: flex;
    padding: 0;
  }

  .continue-btn {
    background-color: #fc6514;
    color: #fff;
    text-shadow: none;
    border-color: #fc6514;
  }

  .body-modal {
    margin-top: 20px;
  }
  .category-item {
    display: flex;
    padding: 0px;
    > li {
      list-style: none;
      padding: 5px 10px;
      :hover {
        cursor: pointer;
      }
    }
  }

  .category-active {
    border-color: #fc6514;
    color: rgba(0, 0, 0, 0.95);
    border-bottom-style: solid;
    border-radius: 0;
    align-self: flex-end;
    margin: 0 0 -2px;
    border-bottom-width: 2px;
    transition: color 0.1s ease;
    font-size: 15px;
    font-weight: bold;
  }

  .template-list {
    height: 400px;
    overflow-y: auto;
  }

  .template-group {
    width: 20%;
    height: 250px;
    padding: 5px;
    float: left;

    .template-item {
      background-size: cover;
      width: 100%;
      height: 100%;
      border: 1px solid #bfacac;
      position: relative;
      :hover {
        cursor: pointer;
      }
      .template-select {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1px solid #fc6514;
        background: rgba(252, 101, 20, 0.2);
        color: #fc6514;
        align-items: center;
        justify-content: center;
        display: flex;
        font-size: 50px;
      }
    }
  }
`;
export const LogoUploadStyled = styled.div`
  .logo {
    width: 100px;
    height: 100px;
  }

  .logo:hover {
    cursor: pointer;
  }
  .remove-logo-btn {
    border: unset;
    > i {
      font-size: 30px;
    }
  }
`;
