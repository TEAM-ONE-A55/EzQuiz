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
  console.log(form);
  console.log(selectedRole);

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
            className="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            name="registration-firstName"
            value={form.firstName}
            onChange={updateForm("firstName")}
            onKeyDown={handleOnKeyDown}
          />
          <label
            htmlFor="registration-firstName"
            className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            First Name
          </label>
        </div>

        <div className="relative mb-6" data-te-input-wrapper-init>
          <input
            type="text"
            id="registration-lastName"
            className="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            name="registration-lastName"
            value={form.lastName}
            onChange={updateForm("lastName")}
            onKeyDown={handleOnKeyDown}
          />
          <label
            htmlFor="registration-lastName"
            className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Last Name
          </label>
        </div>
      </div>
      <div className="relative mb-6" data-te-input-wrapper-init>
        <input
          type="email"
          id="registration-email"
          className="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          name="registration-email"
          value={form.email}
          onChange={updateForm("email")}
          onKeyDown={handleOnKeyDown}
        />
        <label
          htmlFor="registration-email"
          className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          Email
        </label>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative mb-6" data-te-input-wrapper-init>
          <input
            type="text"
            id="registration-username"
            className="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            name="registration-username"
            value={form.username}
            onChange={updateForm("username")}
            onKeyDown={handleOnKeyDown}
          />
          <label
            htmlFor="registration-username"
            className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Username
          </label>
        </div>

        <div className="relative mb-6" data-te-input-wrapper-init>
          <input
            type="password"
            id="registration-password"
            className="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            name="registration-password"
            value={form.password}
            onChange={updateForm("password")}
            onKeyDown={handleOnKeyDown}
          />
          <label
            htmlFor="registration-password"
            className="absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Password
          </label>
        </div>
      </div>

      <div className="relative mb-6" data-te-input-wrapper-init>
        <br />
        <p className="text-gray-500 dark:text-gray-400 ">Select a role:</p>

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
              className="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              name="verification-code"
              value={form.code}
              onChange={updateForm("code")}
              onKeyDown={handleOnKeyDown}
            />
            <label
              htmlFor="verification-code"
              className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Please enter a verification code
            </label>
          </div>
        )}
        <div></div>
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
        className="mb-6 inline-block w-full rounded bg-primary px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        Sign up
      </button>
    </form>
  );
}
