import React from "react";
import { FormErrors } from "./FormErrors";
import "react-datepicker/dist/react-datepicker.css";
//registration phase
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      re_password: "",
      formErrors: { email: "", password: "" },
      emailValid: false,
      passwordValid: false,
      formValid: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value }, () => {
          this.validateField(name, value);
        });
  }

  handleSubmit() {
    alert("Logging In");
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }
  render() {
    return (
      <form>
        <FormErrors formErrors={this.state.formErrors} />
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.email
          )}`}
        >
          <input
            type="text"
            value={this.state.email}
            name="email"
            required
            placeholder="Email address"
            onChange={this.handleChange}
          />
        </div>
        <br />
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.email
          )}`}
        >
          <input
            type="password"
            value={this.state.password}
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </div>
        <br />
        <button onClick={this.handleSubmit} disabled={!this.state.formValid}>
          Login
        </button>
      </form>
    );
  }
}

export default Login;
