import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./Registration.css";
import { register } from "../../services/register-validations";

export default function Registration() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "student",
    isAdmin: false
  });
  const navigate = useNavigate();

  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
  };

  const handleOnKeyDown = (event) => {
    if (event.key === "Enter") return register(form, navigate);
  };

  function handleChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({
      ...form,
      [e.target.name]: value,
    });
  }

  return (
    <div className="register-container">
      <h1>Sign up</h1>
      <div className="register-inputs-wrapper">
        <label htmlFor="registration-firstName">First name: </label>
        <input
          type="text"
          id="registration-firstName"
          name="registration-firstName"
          value={form.firstName}
          onChange={updateForm("firstName")}
          placeholder="Enter your first name"
          onKeyDown={handleOnKeyDown}
        />
        <br />
        <br />
        <label htmlFor="registration-lastName">Last name: </label>
        <input
          type="text"
          id="registration-lastName"
          name="registration-lastName"
          value={form.lastName}
          onChange={updateForm("lastName")}
          placeholder="Enter your last name"
          onKeyDown={handleOnKeyDown}
        />
        <br />
        <br />
        <label htmlFor="registration-username">Username: </label>
        <input
          type="text"
          id="registration-username"
          name="registration-username"
          value={form.username}
          onChange={updateForm("username")}
          placeholder="Enter a username"
          onKeyDown={handleOnKeyDown}
        />
        <br />
        <br />
        <label htmlFor="registration-email">Email: </label>
        <input
          type="text"
          id="registration-email"
          name="registration-email"
          value={form.email}
          onChange={updateForm("email")}
          placeholder="Enter your email"
          onKeyDown={handleOnKeyDown}
        />
        <br />
        <br />
        <label htmlFor="registration-password">Password: </label>
        <input
          type="password"
          id="registration-password"
          name="registration-password"
          value={form.password}
          onChange={updateForm("password")}
          placeholder="Create a strong password"
          onKeyDown={handleOnKeyDown}
        />
        <br />
        <br />
        <label>
          <div>Select role:</div>
          <select
            name="selectedRole"
            onChange={handleChange}
            value={form.role}
            className="selected-role"
          >
            <option value="educator">Educator</option>
            <option value="student">Student</option>
          </select>
        </label>
      </div>
      <Button onClick={() => register(form, navigate)}>Sign up</Button>
    </div>
  );
}
