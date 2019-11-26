import React from "react";
import DatePicker from "react-datepicker";
import { FormErrors } from "./FormErrors";
import "react-datepicker/dist/react-datepicker.css";
//registration phase
class Registration_page extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      re_password: "",
      firstName: "",
      lastName: "",
      gender: "",
      formErrors: { email: "", password: "", loginName: "" },
      emailValid: false,
      passwordValid: false,
      formValid: false,
      DOB: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value }, () => {
          this.validateField(name, value);
        });
  }
  handleDate(dob) {
    this.setState({ DOB: dob });
  }
  handleSubmit() {
    this.state.password === this.state.re_password
      ? alert("Completed")
      : alert("Password doesn't match");
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
      case "re_password":
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
        <br />
        <input
          type="text"
          value={this.state.firstName}
          name="firstName"
          required
          placeholder="First Name"
          onChange={this.handleChange}
        />
        <br />
        <input
          type="text"
          value={this.state.lastName}
          name="lastName"
          placeholder="Last Name"
          onChange={this.handleChange}
        />
        <br />
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
            placeholder="Password (require more than 6 character)"
            onChange={this.handleChange}
          />
          <br />
          <input
            type="password"
            value={this.state.re_password}
            name="re_password"
            placeholder="Confirm Your Password"
            onChange={this.handleChange}
          />
        </div>
        <br />
        <label>
          {" "}
          Gender:
          <input
            type="radio"
            name="gender"
            value="male"
            checked={this.state.gender === "male"}
            onChange={this.handleChange}
          />{" "}
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={this.state.gender === "female"}
            onChange={this.handleChange}
          />{" "}
          Female
        </label>
        <br />
        <label htmlFor="start">DOB:</label>
        <DatePicker selected={this.state.DOB} onChange={this.handleDate} />
        <br />
        <button onClick={this.handleSubmit} disabled={!this.state.formValid}>
          Submit
        </button>
      </form>
    );
  }
}

export default Registration_page;
