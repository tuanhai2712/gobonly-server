import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer
        className={
          "footer" +
          (this.props.transparent !== undefined ? " footer-transparent" : "")
        }
      >
        <div
          className={
            "container" + (this.props.fluid !== undefined ? "-fluid" : "")
          }
        >
          <p className="copyright pull-right">
            &copy; {1900 + new Date().getYear()}{" "}
            <a href="https://www.facebook.com/profile.php?id=100049427490089" target="_blank">Tuan Hai</a>, made with{" "}
            <i className="fa fa-heart heart" /> for a better web
          </p>
        </div>
      </footer>
    );
  }
}
export default Footer;
