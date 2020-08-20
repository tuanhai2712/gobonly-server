import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl
} from "react-bootstrap";

// components
import Card from "@components/Card/Card.jsx";
import Footer from "@components/Footer/Footer.jsx";
import Button from "@components/CustomButton/CustomButton.jsx";
import Checkbox from "@components/CustomCheckbox/CustomCheckbox.jsx";

// image
import bgImage from "@assets/img/full-screen-image-3.jpg";


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHidden: true
    };
  }
  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ cardHidden: false });
      }.bind(this),
      700
    );
  }
  render() {
    return (
      <div>
        <div className="wrapper wrapper-full-page">
          <div
            className="full-page login-page"
            data-color="black"
            data-image={bgImage}
          >
            <div className="content">
            <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }} sm={{ span: 6, offset: 6 }}>
            <form>
              <Card
                hidden={this.state.cardHidden}
                textCenter
                title="Login"
                content={
                  <div>
                    <FormGroup>
                      <FormLabel>Email address</FormLabel>
                      <FormControl placeholder="Enter email" type="email" />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Password</FormLabel>
                      <FormControl placeholder="Password" type="password" autoComplete="off"/>
                    </FormGroup>
                    <FormGroup>
                      <Checkbox number="1" label="Subscribe to newsletter" />
                    </FormGroup>
                  </div>
                }
                legend={
                  <Button bsStyle="info" fill wd>
                    Login
                  </Button>
                }
                ftTextCenter
              />
            </form>
          </Col>
        </Row>
      </Container>
            </div>
            <Footer transparent />
            <div
              className="full-page-background"
              style={{ backgroundImage: "url(" + bgImage + ")" }}
            />
          </div>
        </div>
      </div>
      
    );
  }
}

export default LoginPage;
