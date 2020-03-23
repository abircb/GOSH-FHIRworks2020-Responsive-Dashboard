import React, { Component } from "react";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: "dropdown show-dropdown",
    };
  }
  handleClick = () => {
    if (this.state.classes === "dropdown show-dropdown") {
      this.setState({ classes: "dropdown show-dropdown show" });
    } else {
      this.setState({ classes: "dropdown show-dropdown" });
    }
  };
  activateMode = (mode) => {
    switch (mode) {
      case "light":
        document.body.classList.add("white-content");
        break;
      default:
        document.body.classList.remove("white-content");
        break;
    }
  };
  render() {
    return (
      <div className="fixed-plugin">
        <div className={this.state.classes}>
          <div onClick={this.handleClick}>
            <i className="fa fa-cog fa-2x" />
          </div>
          <ul className="dropdown-menu show">
            <li className="adjustments-line text-center color-change">
              <span className="color-label">LIGHT MODE</span>{" "}
              <span
                className="badge light-badge mr-2"
                onClick={() => {
                  this.activateMode("light");
                  this.props.handleBgClick("green");
                }}
              />{" "}
              <span
                className="badge dark-badge ml-2"
                onClick={() => {
                  this.activateMode("dark");
                  this.props.handleBgClick("blue");
                }}
              />{" "}
              <span className="color-label">DARK MODE</span>{" "}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Settings;
