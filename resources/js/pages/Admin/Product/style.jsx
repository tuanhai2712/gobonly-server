import styled from "styled-components";

export const CreateProductStyled = styled.div`
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
