import styled from "styled-components";

export const CreateProductStyled = styled.div`
  .product-section-select {
    display: flex;
    border: 1px solid #fc6514;
    padding: 7px 14px;
    position: relative;
    margin-bottom: 10px;
    :hover {
      cursor: pointer;
    }
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
  .edit-container {
    display: flex;
    justify-content: center;
  }
  .bg-temp-container {
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
    flex-direction: column;
    margin-top: 20px;
  }

  .custom-product-container {
    border: 1px solid #fc6514;
    margin-top: 10px;
  }
  .custom-tab {
    display: flex;
    border-bottom: 1px solid #fc6514;
    .edit-tab {
      flex: 1;
      padding: 5px;
      text-align: center;
      border-right: 1px solid #fc6514;
      :hover {
        cursor: pointer;
      }
    }
    .preview-tab {
      flex: 1;
      padding: 5px;
      text-align: center;
      :hover {
        cursor: pointer;
      }
    }
    .tab-active {
      background-color: #fc6514;
      color: #fff;
    }
  }
  .img-temp {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    > img {
      width: 100px;
      :hover {
        cursor: pointer;
      }
    }
  }
  .btn-upload-logo {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
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
  .select-template-type-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    .react-select {
      width: 200px;
      margin-right: 10px;
    }
  }

  .template-list {
    height: 400px;
    overflow-y: auto;
  }

  .template-group {
    padding: 5px;
    .template-item {
      background-size: cover;
      width: 100%;
      height: 250px;
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
