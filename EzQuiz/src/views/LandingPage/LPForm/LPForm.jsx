import { useNavigate } from "react-router";
import { register } from "../../../services/register-validations";
import { useState } from "react";
import Select from "react-select";
import { roles } from "../../../constants/constants";

export default function LPForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "student",
    isAdmin: false,
    code: "",
  });

  const [selectedRole, setSelectedRole] = useState([
    { label: "Student", value: "student" },
  ]);
  const navigate = useNavigate();

  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
  };

  const handleOnKeyDown = (event) => {
    if (event.key === "Enter") return register(form, navigate);
  };

  const handleSelectedOptionsUsers = (selected) => {
    setSelectedRole({ ...selected });
    setForm({ ...form, role: selected.value });
  };

  const resetForm = () => {
    setForm({
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "student",
      isAdmin: false,
      code: "",
    });
    setSelectedRole([]);
  };
  return (
    <form>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative mb-6" data-te-input-wrapper-init>
          <input
            type="text"
            id="registration-firstName"
            className="block py-2.5 ps-6 pe-0 w-full text-sm text-neutral-800 bg-transparent border-0 border-b-2 border-neutral-600 appearance-none focus:outline-none focus:ring-0 focus:border-neutal-800 peer"
            placeholder=" "
            name="registration-firstName"
            value={form.firstName}
            onChange={updateForm("firstName")}
            onKeyDown={handleOnKeyDown}
          />
          <label
            htmlFor="registration-firstName"
            className="absolute text-neutral-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-neutral-600
             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            First Name
          </label>
        </div>

        <div className="relative mb-6" data-te-input-wrapper-init>
          <input
            type="text"
            id="registration-lastName"
            className="block py-2.5 ps-6 pe-0 w-full text-sm text-neutral-800 bg-transparent border-0 border-b-2 border-neutral-600 appearance-none focus:outline-none focus:ring-0 focus:border-neutal-800 peer"
            placeholder=" "
            name="registration-lastName"
            value={form.lastName}
            onChange={updateForm("lastName")}
            onKeyDown={handleOnKeyDown}
          />
          <label
            htmlFor="registration-lastName"
            className="absolute text-neutral-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-neutral-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Last Name
          </label>
        </div>
      </div>
      <div className="relative mb-6" data-te-input-wrapper-init>
        <input
          type="email"
          id="registration-email"
          className="block py-2.5 ps-6 pe-0 w-full text-sm text-neutral-800 bg-transparent border-0 border-b-2 border-neutral-600 appearance-none focus:outline-none focus:ring-0 focus:border-neutal-800 peer"
          placeholder=" "
          name="registration-email"
          value={form.email}
          onChange={updateForm("email")}
          onKeyDown={handleOnKeyDown}
        />
        <label
          htmlFor="registration-email"
          className="absolute text-neutral-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-neutral-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          Email
        </label>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative mb-6" data-te-input-wrapper-init>
          <input
            type="text"
            id="registration-username"
            className="block py-2.5 ps-6 pe-0 w-full text-sm text-neutral-800 bg-transparent border-0 border-b-2 border-neutral-600 appearance-none focus:outline-none focus:ring-0 focus:border-neutal-800 peer"
            placeholder=" "
            name="registration-username"
            value={form.username}
            onChange={updateForm("username")}
            onKeyDown={handleOnKeyDown}
          />
          <label
            htmlFor="registration-username"
            className="absolute text-neutral-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-neutral-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Username
          </label>
        </div>

        <div className="relative mb-6" data-te-input-wrapper-init>
          <input
            type="password"
            id="registration-password"
            className="block py-2.5 ps-6 pe-0 w-full text-sm text-neutral-800 bg-transparent border-0 border-b-2 border-neutral-600 appearance-none focus:outline-none focus:ring-0 focus:border-neutal-800 peer"
            placeholder=" "
            name="registration-password"
            value={form.password}
            onChange={updateForm("password")}
            onKeyDown={handleOnKeyDown}
          />
          <label
            htmlFor="registration-password"
            className="absolute text-neutral-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-neutral-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Password
          </label>
        </div>
      </div>

      <div className="relative mb-6" data-te-input-wrapper-init>
        <br />
        <p className="text-gray-500 dark:text-neutral-800 ">Select a role:</p>

        <Select
          name="roles"
          options={roles.map((role) => role)}
          className="basic-select"
          classNamePrefix="select"
          value={selectedRole}
          onChange={handleSelectedOptionsUsers}
          placeholder={selectedRole.label}
          hideSelectedOptions={true}
        />
        <br />
        {form.role === "educator" && (
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="text"
              id="verification-code"
              className="block py-2.5 ps-6 pe-0 w-full text-sm text-neutral-800 bg-transparent border-0 border-b-2 border-neutral-600 appearance-none focus:outline-none focus:ring-0 focus:border-neutal-800 peer"
              placeholder=" "
              name="verification-code"
              value={form.code}
              onChange={updateForm("code")}
              onKeyDown={handleOnKeyDown}
            />
            <label
              htmlFor="verification-code"
              className="absolute text-neutral-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-neutral-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Please enter a verification code
            </label>
          </div>
        )}
      </div>

      <div className="mb-6 flex min-h-[1.5rem] justify-center pl-[1.5rem] font-sans"></div>
      <button
        type="button"
        onClick={() => {
          register(form, navigate);
          resetForm();
        }}
        data-te-ripple-init
        data-te-ripple-color="light"
        className="mb-6 inline-block w-full rounded bg-neutral-800 px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-neutral-900 hover:shadow-neutral-500 focus:outline-none focus:ring-0 active:bg-neutral-700"
      >
        Sign up
      </button>
    </form>
  );
}
